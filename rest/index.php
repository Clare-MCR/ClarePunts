<?php
/**
 * Created by PhpStorm.
 * User: rjgun
 * Date: 10/04/2016
 * Time: 19:20
 */

require 'vendor/autoload.php';
require 'puntsController.php';

spl_autoload_register(); // don't load our classes unless we use them

$mode = 'production'; // 'debug' or 'production'
$server = new \Jacwright\RestServer\RestServer($mode);
$server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

$server->addClass('puntsController');
//$server->addClass('ProductsController', '/products'); // adds this as a base to all the URLs in this class

$server->handle();
