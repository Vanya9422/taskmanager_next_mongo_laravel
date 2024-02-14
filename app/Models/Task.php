<?php

namespace App\Models;

use App\Enums\TaskStatusesEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model {

    use HasFactory;

    protected $collection = 'tasks';

    protected $fillable = [
        'username',
        'email',
        'text',
        'status',
        'edited_by_admin'
    ];

    protected $casts = [
        'edited_by_admin' => 'boolean',
        'status' => TaskStatusesEnum::class,
    ];
}
