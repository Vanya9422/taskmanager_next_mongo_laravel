<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class HelperFacade
 * @package App\Facades
 */
class HelperFacade extends Facade {

    /**
     * @return string
     */
    protected static function getFacadeAccessor(): string { return 'custom_helpers'; }
}
