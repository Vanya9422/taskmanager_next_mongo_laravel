<?php

Route::group([
    'prefix' => 'tasks',
    'namespace' => 'Client\Tasks'
], function () {
    Route::options('/', 'OptionsController');
    Route::get('/', 'ListController');
    Route::post('/', 'StoreController');
});
