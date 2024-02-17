<?php

use App\Repository\Tasks\{TaskRepository, TaskRepositoryInterface};

return [
    'bindings' => [ // интерфейсы и их реализации
        TaskRepositoryInterface::class => TaskRepository::class,
    ],
];
