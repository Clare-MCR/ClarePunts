<?php

/**
 * Created by PhpStorm.
 * User: rjgun
 * Date: 11/04/2016
 * Time: 02:42
 */
class puntsControllerTest extends PHPUnit_Framework_TestCase
{
    /**
     * @return PHPUnit_Extensions_Database_DB_IDatabaseConnection
     */
    public function getConnection()
    {
        define("DB_HOST", "localhost");
        define("DB_USER", "clarepunts");
        define("DB_PASS", "diphmif7");
        define("DB_NAME", "clarepunts");

        $pdo = new PDO('sqlite::memory:');
        return $this->createDefaultDBConnection($pdo, ':memory:');
    }

    public function testGetUser()
    {

    }
}
