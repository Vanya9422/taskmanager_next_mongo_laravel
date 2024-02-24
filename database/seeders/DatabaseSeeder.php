<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Запускаем сидер для заполнения данными
        $this->call([
            AdminSeeder::class,
            TasksTableSeeder::class,
        ]);
    }
}
