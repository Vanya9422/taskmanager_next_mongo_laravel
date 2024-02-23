<?php

namespace App\Http\Requests\Admin\Tasks;

use App\Enums\TaskStatusesEnum;
use App\Http\Requests\ApiFormRequest;

class UpdateTaskRequest extends ApiFormRequest
{
    /**
     * Получите правила проверки, применимые к запросу..
     *
     * @return array
     */
    public function rules(): array
    {
        $statuses = implode(',', TaskStatusesEnum::getValues());

        return [
            'id' => 'required|exists:tasks,_id',
            'text' => 'required|string|min:10|max:1000',
            'status' => "required|in:$statuses",
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id.required' => 'Id задачи обязателен к заполнению.',
            'status.required' => 'Стату задачи обязателен к заполнению.',
            'text.required' => 'Текст задачи обязателен к заполнению.',
            'text.min' => 'Текст задачи должен содержать не менее 10 символов.',
            'text.max' => 'Текст задачи не должен превышать 1000 символов.',
        ];
    }
}
