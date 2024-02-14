<?php

namespace App\Traits;

/**
 * Trait EnumTrait
 *
 * Общий трейт для перечислений (enums), предоставляющий удобные методы для работы с ними.
 */
trait EnumTrait
{
    /**
     * Метод для получения всех значений перечисления.
     *
     * @return array Массив со всеми значениями перечисления.
     */
    public static function getValues(): array
    {
        return array_values(self::toArray());
    }

    /**
     * Метод для получения всех ключей перечисления.
     *
     * @return array Массив со всеми ключами перечисления.
     */
    public static function getKeys(): array
    {
        return array_keys(self::toArray());
    }

    /**
     * Метод для проверки, существует ли заданное значение в перечислении.
     *
     * @param mixed $value Значение, которое необходимо проверить.
     * @return bool Возвращает true, если значение существует в перечислении, иначе false.
     */
    public static function isValidValue($value): bool
    {
        return in_array($value, self::getValues(), true);
    }

    /**
     * Метод для проверки, существует ли заданный ключ в перечислении.
     *
     * @param mixed $key Ключ, который необходимо проверить.
     * @return bool Возвращает true, если ключ существует в перечислении, иначе false.
     */
    public static function isValidKey($key): bool
    {
        return in_array($key, self::getKeys(), true);
    }
}
