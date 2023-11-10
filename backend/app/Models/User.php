<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'profile_photo',
        'cover_photo',
        'bio',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function tweets() {
        return $this->hasMany(Tweet::class);
    }

    public function likes() {
        return $this->hasMany(LikedTweet::class);
    }

    public function followers() {
        return $this->hasMany(Following::class, 'follower_id');
    }

    public function following() {
        return $this->hasMany(Following::class, 'followed_id');
    }
    public function getFollowingUsersCount()
    {
        return $this->whereHas('followers', function($query) {
            $query->where('follower_id', $this->id)
                ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
        })->count();
    }

    public function getFollowersCount()
    {
        return $this->whereHas('following', function($query) {
            $query->where('followed_id', $this->id)
                ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
        })->count();
    }
    public function getFollowingUsersNewTweets()
    {
        return Tweet::whereHas('user', function($query) {
            $query->whereHas('followers', function($query) {
                $query->where('follower_id', $this->id);
            });
        })
            ->whereBetween('created_at', [Carbon::now()->subDay(), Carbon::now()])
            ->get();
    }
}
