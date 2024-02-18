<?php

namespace App\Http\Requests\Tasks;

use App\Http\Requests\ApiFormRequest;

class StoreTaskRequest extends ApiFormRequest
{
    /**
     * Получите правила проверки, применимые к запросу..
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'text' => 'required|string|max:1000',
        ];
    }
}
