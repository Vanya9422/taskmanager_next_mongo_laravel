<?php

namespace App\Http\Controllers\Api\Client\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Tasks\StoreTaskRequest;
use App\Http\Resources\Tasks\TaskResource;
use App\Http\Responses\ResponseBuilder;
use App\Repository\Tasks\TaskRepositoryInterface;
use Illuminate\Http\JsonResponse;

class StoreController extends Controller
{
    /**
     * Обрабатывает запрос на сохранение результата.
     * @param StoreTaskRequest $request
     * @param TaskRepositoryInterface $repository
     * @return JsonResponse|TaskResource
     */
    public function __invoke(
        StoreTaskRequest $request,
        TaskRepositoryInterface $repository
    ): JsonResponse|TaskResource {
        try {
            $validatedData = $request->validated();

            $result = $repository->create($validatedData);

            return new TaskResource($result);
        } catch (\Exception $e) {
            return ResponseBuilder::serverError('Произошла ошибка при сохранении задачи.');
        }
    }
}
