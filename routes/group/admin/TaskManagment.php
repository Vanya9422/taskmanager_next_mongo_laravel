<?php

Route::group([
    // Можно использовать пакет спати для ролей и проверок. Я его использую всегда,
    // но на этом теставом задании не использовал.
    // 'middleware' => ['role:super_admin|admin'],
    'prefix' => 'admin',
    'namespace' => 'Admin\Tasks',
], function () {

    Route::patch('tasks', 'UpdateController');
});
