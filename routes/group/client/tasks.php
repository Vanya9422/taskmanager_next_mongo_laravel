<?php

use App\Http\Controllers\Api\Tasks\{
    OptionsController,
    ListController,
    StoreController,
};

Route::group(['prefix' => 'tasks'], function () {

    Route::options('/', OptionsController::class);
    Route::get('/', ListController::class);
    Route::post('/', StoreController::class);
});
