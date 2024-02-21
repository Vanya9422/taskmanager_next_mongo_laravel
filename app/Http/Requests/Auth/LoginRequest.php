<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiFormRequest;

class LoginRequest extends ApiFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:5'],
            'password' => ['required', 'string', 'min:3'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Необходимо ввести имя пользователя.',
            'name.max' => 'Имя пользователя не может быть длиннее 5 символов.',
            'password.required' => 'Необходимо ввести пароль.',
            'password.min' => 'Пароль должен быть не менее 3 символов.',
        ];
    }
}
