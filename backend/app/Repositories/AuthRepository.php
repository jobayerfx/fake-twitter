<?php

namespace App\Repositories;

use App\Helper\Helper;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class AuthRepository implements AuthRepositoryInterface
{
    public function register(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    public function login($credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyToken')->accessToken;
            $data['user'] = User::query()->find($user->id);
            $data['token'] = $token;
            return Helper::response_with_data($data, false);
        }
        return Helper::validation_response_with_data(null, 'The provided credentials are incorrect.', true);
    }

    public function refreshToken($request)
    {
        $user = $request->user();
// dd($user);
        $userTokens = $user->tokens;

        foreach ($userTokens as $token) {
            $token->revoke();
        }

        return $user->createToken('MyToken')->accessToken;
    }
    public function profileUpdate($data)
    {
        $user = auth()->user();
        // Handle profile photo update
        if (isset($data['profile_photo'])) {
            $profilePhotoPath = $this->uploadPhoto($data['profile_photo'], 'profile_photos');
            $data['profile_photo'] = $profilePhotoPath;
        }

        // Handle cover photo update
        if (isset($data['cover_photo'])) {
            $coverPhotoPath = $this->uploadPhoto($data['cover_photo'], 'cover_photos');
            $data['cover_photo'] = $coverPhotoPath;
        }
        $user->update($data);

        return $user;
    }

    public function uploadPhoto($photo, $folder)
    {
        return $photo->store($folder, 'public');
    }

    public function getUserByUsername($username)
    {
        return User::where('username', $username)->first();
    }

    public function searchUser($search) {
        return User::query()
            ->selectRaw('id, username, name, email, profile_photo, bio ,dob, location, website, MATCH(username, name, email) AGAINST(? IN BOOLEAN MODE) as score', [$search])
            ->whereFullText(['username', 'name', 'email'], $search, ['mode' => 'boolean'])
            ->orderByDesc('score')
            ->limit(10)
            ->get();
    }
}
