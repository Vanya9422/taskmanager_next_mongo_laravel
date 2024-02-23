<?php

use App\Http\Responses\ResponseBuilder;

Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {

    Route::post('login', 'LoginController');

    Route::post('logout', function (\Illuminate\Http\Request $request) {
        $request->user()->currentAccessToken()->delete();

        return ResponseBuilder::success([], 'Вы успешно вышли из системы');
    })->middleware('auth:sanctum');
});
