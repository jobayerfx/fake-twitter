<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use App\Repositories\FollowerRepositoryInterface;
use Illuminate\Http\Request;

class FollowerController extends Controller
{

    protected $followerRepository;

    public function __construct(FollowerRepositoryInterface $followerRepository)
    {
        $this->followerRepository = $followerRepository;
    }

    public function followUser($followedId)
    {
        $followerId = auth()->id();

        if ($followerId == $followedId) {
            return response()->json(['message' => 'Cannot follow yourself', 'error' => true], 422);
        }

        $result = $this->followerRepository->follow($followerId, $followedId);
        if ($result === null) {
            return Helper::response("", "User not found", true, 400);
        } elseif ($result === false) {
            return Helper::response("", "User is already being followed", true, 400);
        }

        return Helper::response("", "Followed successfully", false, 200);
    }

    public function unfollowUser($followedId)
    {
        $followerId = auth()->id();

        if ($followerId == $followedId) {
            return response()->json(['message' => 'Cannot unfollow yourself', 'error' => true], 422);
        }

        $result = $this->followerRepository->unfollow($followerId, $followedId);
        if ($result === null) {
            return Helper::response([], "User not found", true, 400);
        } elseif ($result === false) {
            return Helper::response([], "User is not being followed", true, 400);
        }

        return Helper::response("", "Unfollowed successfully", false, 200);
    }
}
