<?php

namespace App\Http\Requests\Client\Tasks;

use App\Enums\TaskStatusesEnum;
use App\Http\Requests\ApiFormRequest;
use App\Models\Task;

class TasksListTasksRequest extends ApiFormRequest {

    /**
     * Получает правила валидации, которые применяются к запросу.
     *
     * @return array
     */
    public function rules(): array
    {
        $fields = implode(',', (new Task())->getFillable());

        $statuses = implode(',', TaskStatusesEnum::getValues());

        return [
            'sort' => "in:$fields",
            'order' => 'in:asc,desc',
            'status' => "sometimes|in:$statuses",
            'pageSize' => 'sometimes|integer|min:1'
        ];
    }
}
