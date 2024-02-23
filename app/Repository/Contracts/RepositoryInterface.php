<?php

namespace App\Repository\Contracts;

use App\Exceptions\Repository\RepositoryException;
use Illuminate\Database\Eloquent\Model;

/**
 * Общий интерфейс для всех репозиториев
 */
interface RepositoryInterface {

    /**
     * @param array $attributes
     * @return Model
     */
    public function create(array $attributes): Model;

    /**
     * Обновляет сущность в репозитории по её идентификатору.
     *
     * @param int|string $id Идентификатор сущности.
     * @param array $attributes Атрибуты для обновления.
     * @return Model
     * @throws RepositoryException
     */
    public function update(int|string $id, array $attributes): Model;

    /**
     * Находит сущность по идентификатору.
     *
     * @param int|string $id Идентификатор сущности.
     * @return Model|null
     */
    public function find(int|string $id): ?Model;
}
