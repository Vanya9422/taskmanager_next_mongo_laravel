<?php

namespace App\Providers;

use App\Enums\TaskStatusesEnum;
use App\Models\Task;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $task = Task::create([
            'username' => 'Имя пользователя',
            'email' => 'email@example.com',
            'text' => 'Текст задачи',
            'status' => TaskStatusesEnum::NEW,
            'edited_by_admin' => false
        ]);

        dd($task);
//        dd(123);
    }
}
