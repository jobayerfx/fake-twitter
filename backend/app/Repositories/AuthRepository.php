<?php

namespace App\Repositories;

use App\Helper\Helper;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class AuthRepository implements AuthRepositoryInterface
{
    public function register(array $userData)
    {
        return User::create($userData);
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
    public function refreshToken($request)
    {
        $user = $request->user();

        $userTokens = $user->tokens;

        foreach ($userTokens as $token) {
            $token->revoke();
        }

        $newToken = $user->createToken('MyToken')->accessToken;

        return response()->json(['token' => $newToken], 200);
    }

}
