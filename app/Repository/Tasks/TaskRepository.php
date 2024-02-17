<?php

namespace App\Repository\Tasks;

use App\Models\Task;
use App\Repository\BaseRepository;

class TaskRepository extends BaseRepository implements TaskRepositoryInterface {

    /**
     * @return string
     */
    protected function getModelClass(): string {
        return Task::class;
    }
}
