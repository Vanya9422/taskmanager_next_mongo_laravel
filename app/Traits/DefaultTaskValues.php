<?php

namespace App\Traits;

use App\Enums\TaskStatusesEnum;

/**
 * Trait DefaultTaskValues
 *
 * Трейт для установки значений по умолчанию для модели Task.
 */
trait DefaultTaskValues
{
    /**
     * Метод bootTrait для установки значений по умолчанию при создании модели.
     */
    protected static function bootDefaultTaskValues()
    {
        // Обработчик события "создание" модели
        static::creating(function ($model) {
            // Устанавливаем статус "Новая задача" по умолчанию
            if (!isset($model->status)) {
                $model->status = TaskStatusesEnum::NEW;
            }

            // Устанавливаем значение "edited_by_admin" по умолчанию
            if (!isset($model->edited_by_admin)) {
                $model->edited_by_admin = false;
            }
        });
    }
}
