<?php

Route::group(['prefix' => 'tasks'], function () {

    Route::post('/', \App\Http\Controllers\Api\Tasks\StoreController::class);
});
