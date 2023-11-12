<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/auth/register',  [AuthController::class,'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/refresh-token',  [AuthController::class, 'refreshToken']);
Route::post('/auth/logout',  [AuthController::class, 'logout']);

// REST API endpoints
Route::middleware('auth:api')->group(function() {
    // User details
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);
    Route::get('/me/following', [AuthController::class, 'following']);
    Route::get('/me/followers', [AuthController::class, 'follows']);

    // Tweets and likes
    Route::get('/tweets', [TweetController::class, 'tweets']);
    Route::post('/tweets', [TweetController::class, 'store']);
    Route::put('/tweets/{tweet_id}', [TweetController::class, 'update']);
    Route::delete('/tweets/{tweet_id}', [TweetController::class, 'destroy']);
    Route::get('/tweets/{tweet_id}', [TweetController::class, 'show']);
    Route::post('/tweets/{tweet_id}/like', [TweetController::class, 'like']);
    Route::delete('/tweets/{tweet_id}/unlike', [TweetController::class, 'unlike']);

    Route::post('/follow/{user}', [FollowerController::class, 'followUser']);
    Route::post('/unfollow/{user}', [FollowerController::class, 'unfollowUser']);
    Route::post('/search', [UserController::class, 'search']);
    Route::get('/profile/{username}', [UserController::class, 'profileByUsername']);
});
