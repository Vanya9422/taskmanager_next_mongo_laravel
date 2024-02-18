<?php

namespace App\Repository;

use App\Exceptions\Repository\RepositoryException;
use App\Repository\Contracts\RepositoryInterface;
use Illuminate\Container\Container as Application;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Базовый класс репозитория, который определяет основные операции,
 * которые должны быть реализованы в наследуемых репозиториях.
 */
abstract class BaseRepository implements RepositoryInterface
{
    /**
     * @var Application Контейнер приложения, используется для резолва моделей и других зависимостей.
     */
    protected Application $app;

    protected $model;

    /**
     * @param Application $app
     * @throws RepositoryException
     * @throws BindingResolutionException
     */
    public function __construct(Application $app) {
        $this->app = $app;
        $this->makeModel();
        $this->boot();
    }

    /**
     * Метод для инициализации дополнительной логики после создания репозитория.
     * Может использоваться для добавления начальных критериев фильтрации,
     * которые должны применяться ко всем запросам репозитория.
     */
    public function boot()
    {
        // Добавьте здесь вашу логику инициализации.
        // Например:
        // $this->pushCriteria(new YourInitialCriteria());
    }

    /**
     * Returns the current Model instance
     *
     * @return Model
     */
    public function getModel(): Model {
        return $this->model;
    }

    /**
     * Начинает новый запрос к базе данных, возвращая построитель запросов для модели.
     *
     * @return Builder
     */
    protected function startQuery(): Builder
    {
        return $this->getModel()->newQuery();
    }

    /**
     * Сбрасывает экземпляр модели, создавая новый экземпляр.
     * @return void
     * @throws RepositoryException
     * @throws BindingResolutionException
     */
    public function resetModel()
    {
        $this->makeModel();
    }

    /**
     * Возвращает имя класса модели.
     * Этот метод должен быть реализован в каждом конкретном репозитории.
     *
     * @return string Название класса модели.
     */
    abstract protected function getModelClass(): string;

    /**
     * Создает и возвращает экземпляр модели.
     * @return Model
     * @throws RepositoryException
     * @throws BindingResolutionException
     */
    public function makeModel(): Model {
        $model = $this->app->make($this->getModelClass());

        if (!$model instanceof Model) {
            throw new RepositoryException(
                "Class {$this->getModelClass()} must be an instance of Illuminate\\Database\\Eloquent\\Model"
            );
        }

        return $this->model = $model;
    }

    /**
     * Создает новый результат в базе данных.
     *
     * @param array $attributes Атрибуты для создания результата.
     */
    public function create(array $attributes): Model {
        return $this->startQuery()->create($attributes);
    }
}
