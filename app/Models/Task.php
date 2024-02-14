<?php

namespace App\Models;

use App\Enums\TaskStatusesEnum;
use App\Traits\DefaultTaskValues;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Task extends Model {

    use HasFactory, DefaultTaskValues;

    public $timestamps = true;

    protected $fillable = [
        'username',
        'email',
        'text',
        'status',
        'edited_by_admin',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'edited_by_admin' => 'boolean',
        'status' => TaskStatusesEnum::class,
    ];
}
