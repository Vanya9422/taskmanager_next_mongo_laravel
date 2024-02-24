<?php

use App\Http\Responses\ResponseBuilder;

Route::get('3d4bf18b866552d669a3c44c6e46e204', fn() => ResponseBuilder::success(csrf_token(), 'ok'));

Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {

    Route::post('login', 'LoginController');

    Route::post('logout', function (\Illuminate\Http\Request $request) {
        $request->user()->currentAccessToken()->delete();

        return ResponseBuilder::success([], 'Вы успешно вышли из системы');
    })->middleware('auth:sanctum');
});
