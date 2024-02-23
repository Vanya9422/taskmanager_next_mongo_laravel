<?php

namespace App\Facades;

class Helpers
{
    /**
     * @param string $folder
     * @return void
     */
    static function findFiles(string $folder)
    {
        $files = scandir($folder);

        foreach ($files as $file) {
            // Игнорируем текущую и родительскую директории
            if ($file != '.' && $file != '..') {
                $path = $folder . '/' . $file;
                if (is_file($path)) {
                    include_once $path;
                } elseif (is_dir($path)) {
                    // Если это директория, вызываем функцию рекурсивно
                    static::findFiles($path);
                }
            }
        }
    }
}
