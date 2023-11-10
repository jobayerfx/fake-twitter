<?php

namespace App\Repositories;

use App\Models\Following;
use App\Models\User;

class FollowerRepository implements FollowerRepositoryInterface
{

    public function getFollowedUserIds($followerId)
    {
        return Following::where('follower_id', $followerId)
            ->pluck('followed_id')
            ->toArray();
    }
    public function follow($followerId, $followedId)
    {
        if (!$this->isUserExists($followedId)) {
            return null; // User not found
        }
        if ($this->isFollowing($followerId, $followedId)) {
            return false; // Already following
        }
        return Following::create([
            'follower_id' => $followerId,
            'followed_id' => $followedId,
        ]);
    }

    public function unfollow($followerId, $followedId)
    {
        // Check if the user with $followedId exists
        if (!$this->isUserExists($followedId)) {
            return null; // User not found
        }

        // Check if the user is being followed
        if (!$this->isFollowing($followerId, $followedId)) {
            return false; // Not following
        }

        Following::where('follower_id', $followerId)
            ->where('followed_id', $followedId)
            ->delete();
        return true;
    }

    public function isUserExists($userId)
    {
        return User::find($userId);
    }
    public function isFollowing($followerId, $followedId)
    {
        return Following::where('follower_id', $followerId)
            ->where('followed_id', $followedId)
            ->exists();
    }

    public function getFollowing($userId)
    {
        return Following::where('follower_id', $userId)
            ->pluck('followed_id')
            ->toArray();
    }

    public function getFollowers($userId)
    {
        return Following::where('followed_id', $userId)
            ->pluck('follower_id')
            ->toArray();
    }
}
