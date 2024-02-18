<?php

namespace App\Repository\Tasks;

use App\Models\Task;
use App\Repository\BaseRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class TaskRepository extends BaseRepository implements TaskRepositoryInterface {

    /**
     * @return string
     */
    protected function getModelClass(): string {
        return Task::class;
    }

    /**
     * Получить отфильтрованный список задач с учетом пагинации и сортировки.
     *
     * @param array $filters Ассоциативный массив фильтров и параметров сортировки.
     * @param int $pageSize Количество задач на страницу.
     * @return LengthAwarePaginator
     */
    public function getFilteredTasks(array $filters, int $pageSize): LengthAwarePaginator
    {
        $query = $this->startQuery()
                ->when(isset($filters['status']), function ($q) use ($filters) {
                    $q->where('status', '=', (int) $filters['status']);
                })
                // Применение сортировки
                ->when(!empty($filters['sort']) && !empty($filters['order']), function ($q) use ($filters) {
                    $q->orderBy($filters['sort'], $filters['order']);
                });

        return $query->paginate($pageSize);
    }
}
