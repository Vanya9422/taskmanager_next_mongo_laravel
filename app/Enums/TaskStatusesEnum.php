<?php

namespace App\Enums;

enum TaskStatusesEnum: int
{
    case NEW = 0; // Новая Задача

    case IN_PROGRESS = 1; // В Процесе

    case DONE = 2; // Завершено
}
