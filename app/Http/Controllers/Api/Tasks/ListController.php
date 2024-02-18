<?php

namespace App\Http\Controllers\Api\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tasks\TasksListTasksRequest;
use App\Http\Resources\Tasks\TaskResource;
use App\Repository\Tasks\TaskRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ListController extends Controller
{
    /**
     * Обрабатывает запрос на сохранение результата.
     * @param TasksListTasksRequest $request
     * @param TaskRepositoryInterface $repository
     * @return JsonResponse|TaskResource
     */
    public function __invoke(
        TasksListTasksRequest $request,
        TaskRepositoryInterface $repository
    ): JsonResponse|AnonymousResourceCollection {
        $filters = $request->validated();
        $pageSize = $request->get('pageSize', 3);
        $tasks = $repository->getFilteredTasks($filters, $pageSize);

        return TaskResource::collection($tasks);
    }
}
