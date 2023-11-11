<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use App\Http\Resources\TweetResource;
use App\Models\Tweet;
use App\Repositories\FollowerRepositoryInterface;
use App\Repositories\TweetRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TweetController extends Controller
{

    protected $tweetRepository;
    protected $followerRepository;

    public function __construct(TweetRepositoryInterface $tweetRepository, FollowerRepositoryInterface $followerRepository)
    {
        $this->tweetRepository = $tweetRepository;
        $this->followerRepository = $followerRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function tweets(Request $request)
    {
        $userId = auth()->user()->id;
        $followedUserIds = $this->followerRepository->getFollowedUserIds($userId);

        $tweetCollection = $this->tweetRepository->getTweetsForUser($userId, $followedUserIds);

        return Helper::response(TweetResource::collection($tweetCollection), 'User tweets data.', false, 200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return Helper::validation_response_with_data(null, $validator->errors()->first(), true);
        }
        $data = $request->all();

        $data['user_id'] = $request->user()->id;
        $tweet = $this->tweetRepository->createTweet($data);

        return Helper::response($tweet, 'Tweet added successfully', false, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function show($tweetId)
    {
        $tweet = $this->tweetRepository->find($tweetId);
//        dd($tweet);
        if ($tweet) {
            return Helper::response_with_data(TweetResource::make($tweet), false);
        }
        return Helper::response([], "No Tweet found", true, 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function edit(Tweet $tweet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $tweetId)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return Helper::validation_response_with_data(null, $validator->errors()->first(), true);
        }
        $tweet = $this->tweetRepository->updateTweet($tweetId, $request->all());
        if ($tweet) {
            return Helper::response_with_data(TweetResource::make($tweet), false);
        } else {
            return Helper::response([], 'Tweet not found', true, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Http\Response
     */
    public function destroy($tweetId)
    {
        $tweet = $this->tweetRepository->deleteTweet($tweetId);

        if ($tweet) {
            // Optionally, you can return a success response or redirect as needed
            return response()->json(['message' => 'Tweet deleted successfully']);
        } else {
            return response()->json(['message' => 'Tweet not found'], 404);
        }
    }
    public function like($tweetId)
    {
        $userId = auth()->id();

        $tweet = $this->tweetRepository->like($userId, $tweetId);

        return Helper::response_with_data(TweetResource::make($tweet), false);
    }

    public function unlike($tweetId)
    {
        $userId = auth()->id();

        $tweet = $this->tweetRepository->unlike($userId, $tweetId);

        return Helper::response_with_data(TweetResource::make($tweet), false);
    }
}
