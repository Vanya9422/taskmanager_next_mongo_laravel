<?php

namespace App\Http\Requests\Tasks;

use App\Enums\TaskStatusesEnum;
use App\Http\Requests\ApiFormRequest;

class TasksListTasksRequest extends ApiFormRequest {

    /**
     * Получает правила валидации, которые применяются к запросу.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'sort' => 'in:username,email',
            'order' => 'in:asc,desc',
            'status' => 'sometimes|in:' . implode(',', TaskStatusesEnum::getValues()),
            'pageSize' => 'sometimes|integer|min:1'
        ];
    }
}
