<?php

namespace App\Repositories;

use App\Models\User;

interface AuthRepositoryInterface
{
    public function register(array $userData);
    public function login(array $credentials);
    public function refreshToken($request);
    public function profileUpdate($data);
    public function uploadPhoto($photo, $folder);
    public function searchUser($search);
}
