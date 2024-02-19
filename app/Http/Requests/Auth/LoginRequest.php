<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiFormRequest;

class LoginRequest extends ApiFormRequest {
    public function rules(): array {
        return [
            'name' => 'required|string|max:100',
            'password' => 'required|string|min:3|max:50',
        ];
    }
}
