<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\FollowerRepositoryInterface;
use Illuminate\Http\Request;
use App\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authRepository;
    protected $followerRepository;

    public function __construct(AuthRepositoryInterface $authRepository, FollowerRepositoryInterface $followerRepository)
    {
        $this->authRepository = $authRepository;
        $this->followerRepository = $followerRepository;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
        if ($validator->fails()) {
            return Helper::validation_response_with_data(null, $validator->errors()->first(), true);
        }
        $this->authRepository->register($request->all());
        return response()->json(['message' => 'Registration successful'], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return Helper::validation_response_with_data(null, $validator->errors()->first(), true);
        }
        $loginType = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $credentials = [
            $loginType => $request->input('email'),
            'password' => $request->input('password'),
        ];
        return $this->authRepository->login($credentials);
    }
    public function logout()
    {
        try {
            if (Auth::check()) {
                auth()->user()->token()->revoke();
                return Helper::response(null,'Successfully logout', false, 200);
            }
            return Helper::response(null,'Something went wrong', true, 401);
        } catch (\Exception $e) {
            return Helper::response(null,$e->getMessage(), false, $e->getCode());
        }
    }

    public function me()
    {
        $user = auth()->user();

        if ($user) {
            $userData = new UserResource($user);
            return Helper::response_with_data($userData, false);
        }
        return response()->json(['message' => 'User not authenticated', 'error' => true], 401);
    }
    public function refreshToken(Request $request)
    {
        if (!Auth::check()) {
            return Helper::response(null,'Something went wrong', true, 401);
        }
        $newToken = $this->authRepository->refreshToken($request);
        return response()->json(['token' => $newToken], 200);
    }
    public function updateProfile(Request $request)
    {
        $user = $this->authRepository->profileUpdate($request->all());

        return response()->json(['message' => 'Profile updated successfully', 'data' => UserResource::make($user)]);
    }

    public function following()
    {
        $userId = auth()->id();
        $followingIds = $this->followerRepository->getFollowing($userId);

        $following = UserResource::collection(User::whereIn('id', $followingIds)->get());
        return Helper::response_with_data($following, false);
    }

    public function follows()
    {
        $userId = auth()->id();
        $followerIds = $this->followerRepository->getFollowers($userId);

        $followers = UserResource::collection(User::whereIn('id', $followerIds)->get());

        return Helper::response_with_data($followers, false);
    }

    public function getFollowByUser($username) {

        $user = $this->authRepository->getUserByUsername($username);
        if (!$user) {
            return Helper::response([], 'No user data found!', false, 404);
        }
        $followingIds = $this->followerRepository->getFollowing($user->id);

        $following = UserResource::collection(User::whereIn('id', $followingIds)->get());

        $followerIds = $this->followerRepository->getFollowers($user->id);

        $followers = UserResource::collection(User::whereIn('id', $followerIds)->get());

        return Helper::response(['followings' => $following, 'followers' => $followers], 'User Following data', false, 200);
    }

}
