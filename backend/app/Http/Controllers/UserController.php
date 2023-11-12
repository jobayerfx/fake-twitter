<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use App\Http\Resources\TweetResource;
use App\Http\Resources\UserResource;
use App\Repositories\AuthRepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function search(Request $request) {
        $search = preg_replace('/[+\-*><()~"@]/', '', trim(request('search')));
        $search = htmlspecialchars($search, ENT_QUOTES, 'UTF-8');

        if(!$search) {
            return Helper::response([], 'No user data found!', false, 404);
        }
        $search .= '*';

        $users = $this->authRepository->searchUser($search);

        return Helper::response(UserResource::collection($users), 'User filtered data.', false, 200);
    }
    public function profileByUsername(Request $request, $username)
    {
        // Get user by username from the repository
        $user = $this->authRepository->getUserByUsername($username);

        if (!$user) {
            return Helper::response([], 'No user data found!', false, 404);
        }

        return Helper::response(UserResource::make($user), 'User data', false, 200);
    }
}
