<?php

namespace App\Http\Resources\Tasks;

use App\Enums\TaskStatusesEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property string $id
 * @property string $username
 * @property string $email
 * @property string $text
 * @property int $status
 * @property bool $edited_by_admin
 * @property mixed $created_at
 * @property mixed $updated_at
 */
class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $updatedAt = $this->updated_at->diffForHumans();

        // Проверяем, совпадают ли дата создания и дата обновления
        $updatedAtFormatted = $this->created_at == $this->updated_at ? 'Не обновлено' : $updatedAt;

        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'text' => $this->text,
            'status' => TaskStatusesEnum::getDescription($this->status),
            'edited_by_admin' => $this->edited_by_admin,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'updated_at' => $updatedAtFormatted
        ];
    }
}
