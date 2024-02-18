<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Task::truncate();

        // Запускаем сидер для заполнения данными
        $this->call(TasksTableSeeder::class);
    }
}
