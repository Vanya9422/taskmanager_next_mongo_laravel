<?php

namespace App\Http\Controllers\Api\Client\Tasks;

use App\Enums\TaskStatusesEnum;
use App\Http\Controllers\Controller;
use App\Http\Responses\ResponseBuilder;
use Illuminate\Http\JsonResponse;

class OptionsController extends Controller
{
    /**
     * Возвращает JsonResponse с возможными статусами задач.
     *
     * @return JsonResponse
     */
    public function __invoke(): JsonResponse
    {
        // Используем метод getValues или getKeys из EnumTrait для получения статусов
        $statuses = TaskStatusesEnum::getValues();

        // Структурируем ответ для фронтенда
        $response = [
            'statuses' => array_map(function ($status) {
                return [
                    'value' => $status,
                    'label' => TaskStatusesEnum::from($status)->name
                ];
            }, $statuses)
        ];

        return ResponseBuilder::success($response);
    }
}
