<?php

use App\Http\Responses\ResponseBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\{
    LoginController,
};

Route::group(['prefix' => 'auth'], function () {

    Route::post('login', LoginController::class);

    Route::post('logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();

        return ResponseBuilder::success([], 'Вы успешно вышли из системы');
    })->middleware('auth:sanctum');
});
