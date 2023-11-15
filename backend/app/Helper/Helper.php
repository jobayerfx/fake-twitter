<?php

namespace App\Helper;

class Helper
{
    public static function response_with_data($data, $error): \Illuminate\Http\JsonResponse
    {

        return response()->json(
            [
                'error' => $error,
                'message' => $error == true ? 'Something went wrong' : 'Success',
                'data' => $error == true ? [] : $data
            ],
            $error ? 500 : 200
        );
    }

    public static function validation_response_with_data($data, $messages, $error): \Illuminate\Http\JsonResponse
    {

        return response()->json(
            [
                'error' => $error,
                'message' => $messages,
                'data' => $error == true ? [] : $data
            ],
            500
        );
    }

    public static function validation_response_with_success_data($data, $messages, $error): \Illuminate\Http\JsonResponse
    {

        return response()->json(
            [
                'error' => $error,
                'message' => $messages,
                'data' => $error ? [] : $data
            ],
            200
        );
    }

    public static function response($data, $messages, $error, $code): \Illuminate\Http\JsonResponse
    {

        return response()->json(
            [
                'error' => $error,
                'message' => $messages,
                'data' => $data
            ],
            $code
        );
    }
    public static function trimEmail($email) 
    {
        $emailParts = explode('@', $email);
        return $emailParts[0];
    }

}
