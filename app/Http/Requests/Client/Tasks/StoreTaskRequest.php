<?php

namespace App\Http\Requests\Client\Tasks;

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
            'username' => 'required|string|min:3|max:30|regex:/^[^\d]*$/',
            'email' => 'required|email|max:100',
            'text' => 'required|string|min:10|max:1000',
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
            'username.required' => 'Имя пользователя обязательно к заполнению.',
            'username.min' => 'Имя пользователя должно быть не короче 3 символов.',
            'username.max' => 'Имя пользователя должно быть не длиннее 30 символов.',
            'username.regex' => 'Имя пользователя не должно содержать цифры.',
            'email.required' => 'Адрес электронной почты обязателен к заполнению.',
            'email.email' => 'Необходимо ввести корректный адрес электронной почты.',
            'email.max' => 'Адрес электронной почты не должен превышать 255 символов.',
            'text.required' => 'Текст задачи обязателен к заполнению.',
            'text.min' => 'Текст задачи должен содержать не менее 10 символов.',
            'text.max' => 'Текст задачи не должен превышать 1000 символов.',
        ];
    }
}
