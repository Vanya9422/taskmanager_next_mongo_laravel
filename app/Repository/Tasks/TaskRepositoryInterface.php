<?php

namespace App\Repository\Tasks;
use Illuminate\Pagination\LengthAwarePaginator;

interface TaskRepositoryInterface {

    /**
     * Получить отфильтрованный список задач с учетом пагинации.
     *
     * @param array $filters Ассоциативный массив фильтров, где ключи — это поля для фильтрации, а значения — условия фильтра.
     * @param int $pageSize Количество задач на страницу.
     * @return LengthAwarePaginator
     */
    public function getFilteredTasks(array $filters, int $pageSize): LengthAwarePaginator;
}
