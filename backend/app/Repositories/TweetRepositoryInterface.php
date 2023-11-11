<?php

namespace App\Repositories;

interface TweetRepositoryInterface
{
    public function getFollowedUserIds($followerId);
    public function getTweetsForUser($userId, $followedUserIds);
    public function createTweet($data);
    public function find($tweetId);
    public function updateTweet($tweetId, array $data);
    public function deleteTweet($tweetId);
    public function isLikedByUser($userId, $tweetId);
    public function like($userId, $tweetId);
    public function unlike($userId, $tweetId);
}
