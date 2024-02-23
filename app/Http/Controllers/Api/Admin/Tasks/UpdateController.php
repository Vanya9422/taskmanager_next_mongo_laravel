<?php

namespace App\Http\Controllers\Api\Admin\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tasks\UpdateTaskRequest;
use App\Http\Resources\Tasks\TaskResource;
use App\Http\Responses\ResponseBuilder;
use App\Repository\Tasks\TaskRepositoryInterface;
use Illuminate\Http\JsonResponse;

class UpdateController extends Controller
{
    /**
     * Обрабатывает запрос на обовление результата.
     * @param UpdateTaskRequest $request
     * @param TaskRepositoryInterface $repository
     * @return JsonResponse|TaskResource
     */
    public function __invoke(
        UpdateTaskRequest $request,
        TaskRepositoryInterface $repository
    ): JsonResponse|TaskResource {
        try {
            $validatedData = $request->validated();
            $validatedData['edited_by_admin'] = true;

            $result = $repository->update($request->get('id'), $validatedData);

            return new TaskResource($result);
        } catch (\Exception $e) {
            return ResponseBuilder::serverError('Произошла ошибка при обновлении задачи.');
        }
    }
}
