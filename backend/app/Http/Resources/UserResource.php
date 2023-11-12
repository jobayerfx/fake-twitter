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
            'profile_photo' => $this->profile_photo,
            'cover_photo' => $this->cover_photo,
            'bio' => $this->bio,
            'dob' => $this->dob,
            'location' => $this->location,
            'website' => $this->website,
        ];
    }
}
