<?php

namespace App\Http\Resources\Tasks;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $username
 * @property string $email
 * @property string $text
 * @property mixed $status
 * @property bool $edited_by_admin
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
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'text' => $this->text,
            'status' => $this->status,
            'edited_by_admin' => $this->edited_by_admin
        ];
    }
}
