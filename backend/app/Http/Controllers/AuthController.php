<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use Illuminate\Http\Request;
use App\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        $this->authRepository->register($validatedData);
        return response()->json(['message' => 'Registration successful'], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return Helper::validation_response_with_data(null, $validator->errors()->first(), true);
        }
        $credentials = $request->only('email', 'password');
        $this->authRepository->login($credentials);
    }
    public function logout()
    {
        $this->authRepository->logout();
    }
    public function refreshToken(Request $request)
    {
        $this->authRepository->refreshToken($request);
    }

}
