<?php

namespace App\Repositories;

use App\Http\Resources\TweetResource;
use App\Models\Following;
use App\Models\Tweet;
use Illuminate\Support\Facades\Storage;

class TweetRepository implements TweetRepositoryInterface
{

    public function getFollowedUserIds($followerId)
    {
        return Following::where('follower_id', $followerId)
            ->pluck('followed_id')
            ->toArray();
    }
    public function getTweetsForUser($userId, $followedUserIds)
    {
        return Tweet::with('user')->whereIn('user_id', array_merge($followedUserIds, [$userId]))->orderBy('created_at', 'desc')
            ->cursorPaginate();
    }

    public function getTweetsByUser($userId)
    {
        return Tweet::with('user')->where('user_id', $userId)->orderBy('created_at', 'desc')->cursorPaginate();
    }

    public function createTweet($data)
    {
        if (isset($data['image'])) {
            $imagePath = $data['image']->store('tweet_images', 'public');
            $data['image'] = $imagePath;
        }
        $tweet = Tweet::create($data);
        $tweetWithUser = Tweet::with('user')->find($tweet->id);
        return $tweetWithUser;
    }

    public function deleteTweet($tweetId)
    {
        $tweet = Tweet::find($tweetId);

        if ($tweet) {
            // Delete the tweet
            $tweet->delete();
        }

        return $tweet;
    }

    public function find($tweetId)
    {
        return Tweet::with('user', 'likes')->find($tweetId);
    }
    public function updateTweet($tweetId, array $data)
    {
        $tweet = Tweet::find($tweetId);

        if ($tweet) {
            // Update the tweet
            $tweet->update($data);
        }

        return $tweet;
    }
    
    public function isLikedByUser($userId, $tweetId)
    {
        return Tweet::whereHas('likes', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('id', $tweetId)->exists();
    }

    public function like($userId, $tweetId)
    {
        if ($this->isLikedByUser($userId, $tweetId)) {
            return $this->find($tweetId);
        }

        $tweet = $this->find($tweetId);
        if ($tweet) {
            $tweet->likes()->attach($userId);
            $tweet->load('likes');
        }
        return $tweet;
    }

    public function unlike($userId, $tweetId)
    {
        $tweet = $this->find($tweetId);
        if ($tweet) {
            $tweet->likes()->detach($userId);
            $tweet->load('likes');
        }
        return $tweet;
    }

}
