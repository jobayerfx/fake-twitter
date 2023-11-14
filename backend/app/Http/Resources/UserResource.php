<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->name,
            'email' => $this->email,
            'profile_photo' => $this->profile_photo ? asset('storage/' .$this->profile_photo) : null,
            'cover_photo' => $this->cover_photo ? asset('storage/' .$this->cover_photo) : null,
            'bio' => $this->bio,
            'dob' => $this->dob,
            'location' => $this->location,
            'website' => $this->website,
        ];
    }
}
