<?php

namespace App\Repositories;

interface FollowerRepositoryInterface
{
    public function getFollowedUserIds($followerId);
    public function follow($followerId, $followedId);
    public function unfollow($followerId, $followedId);
    public function isFollowing($followerId, $followedId);
    public function isUserExists($userId);
    public function getFollowing($userId);
    public function getFollowers($userId);
}
