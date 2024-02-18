<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'text' => $this->faker->realText,
            'status' => $this->faker->randomElement([0, 1, 2]),
            'edited_by_admin' => $this->faker->boolean
        ];
    }
}
