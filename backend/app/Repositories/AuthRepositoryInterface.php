<?php

namespace App\Repositories;

interface AuthRepositoryInterface
{
    public function register(array $userData);
    public function login(array $credentials);
    public function logout();
    public function refreshToken($request);
}
