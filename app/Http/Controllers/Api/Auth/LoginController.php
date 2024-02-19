<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\Users\UserResource;
use App\Http\Responses\ResponseBuilder;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller {

    /**
     * Обрабатывает попытку входа в систему.
     *
     * @param LoginRequest $request Входящий запрос, валидированный через LoginRequest.
     * @return JsonResponse Возвращает JSON ответ с токеном или сообщением об ошибке.
     */
    public function __invoke(LoginRequest $request): JsonResponse {
        $user = User::query()->where('name', $request->get('name'))->first();

        if (!$user)
            return ResponseBuilder::error('Пользователь с таким именем не найден', Response::HTTP_NOT_FOUND);

        if (!Hash::check($request->get('password'), $user->password))
            return ResponseBuilder::error('Неверные учетные данные', Response::HTTP_UNAUTHORIZED);

        return ResponseBuilder::success([
            'token' => $user->createToken('Api Token')->plainTextToken,
            'user' => new UserResource($user)
        ], 'Аутентификация прошла успешно');
    }
}
