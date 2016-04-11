<?php

/**
 * Created by PhpStorm.
 * User: rjgun
 * Date: 10/04/2016
 * Time: 19:24
 */
use Jacwright\RestServer\RestException;

require 'database.class.php';
require 'config.php';

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

class puntsController
{
    /**
     * Checks whether user is authorised
     */
    public function authorize()
    {
        $this->db = new Database();
        $this->user = ($_SERVER['REMOTE_USER']);
        $this->db->query('(SELECT * FROM user_mcr WHERE crsid = :id) 
        UNION 
        (SELECT * FROM user_ucs WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_fellows WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_staff WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_porters WHERE crsid = :id)
        ');
        $this->db->bind(':id', $this->user);
        $row = $this->db->single();

        //print_r($row);
        if ($row) {
            if ($row["authorised"]) {
                $this->name = $row["name"];
                if (!$this->name) {
                    $this->name = $this->getUser();
                }
                $this->phone = $row["phone"];
                $this->admin = $row["admin"];
                return true;
            }
        } else {
            return false;
        };
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /
     * @url GET /users
     * @url GET /users/$id
     */
    public function getUser($id = null)
    {
        $this->db->query('(SELECT * FROM user_mcr WHERE crsid = :id) 
        UNION 
        (SELECT * FROM user_ucs WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_fellows WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_staff WHERE crsid = :id)
        UNION 
        (SELECT * FROM user_porters WHERE crsid = :id)
        ');

        if (!$id) {
            $id = $this->user;
        }
        $this->db->bind(':id', $id);
        $row = $this->db->single();

        if (!$row["name"]) {
            $ds = ldap_connect("ldap.lookup.cam.ac.uk");
            $lsearch = ldap_search($ds, "ou=people,o=University of Cambridge,dc=cam,dc=ac,dc=uk", "uid=" . $id . "");
            $info = ldap_get_entries($ds, $lsearch);
            $this->name = $info[0]["cn"][0];
            $this->db->query('UPDATE user_mcr SET name=:name WHERE crsid=:id;
              UPDATE user_ucs SET name=:name WHERE crsid=:id;
              UPDATE user_fellows SET name=:name WHERE crsid=:id;
              UPDATE user_staff SET name=:name WHERE crsid=:id;
              UPDATE user_porters SET name=:name WHERE crsid=:id;');
            $this->db->bind(':id', $id);
            $this->db->bind(':name', $this->name);
            $this->db->execute();
        }
        return $row;
    }

    /**
     * Saves a booking to the database
     *
     * @url POST /bookings
     */
    public function saveBooking($data)
    {

        $puntid = test_input($data->puntid);
        $booker = test_input($data->booker);
        $name = test_input($data->name);
        $mobile = test_input($data->mobile);
        $timeFrom = test_input($data->time_from);
        $timeTo = test_input($data->time_to);

        if ($booker !== $this->user && $this->admin !== 1) {
            return false;
        };

        if ($mobile) {
            $this->db->query('UPDATE user_mcr SET phone=:phone WHERE crsid=:id;
              UPDATE user_ucs SET phone=:phone WHERE crsid=:id;
              UPDATE user_fellows SET phone=:phone WHERE crsid=:id;
              UPDATE user_staff SET phone=:phone WHERE crsid=:id;
              UPDATE user_porters SET phone=:phone WHERE crsid=:id;');
            $this->db->bind(':id', $booker);
            $this->db->bind(':phone', $mobile);
            $this->db->execute();
        } else {
            $this->db->query('(SELECT phone FROM user_mcr WHERE crsid = :id) 
                UNION 
                (SELECT phone FROM user_ucs WHERE crsid = :id)
                UNION 
                (SELECT phone FROM user_fellows WHERE crsid = :id)
                UNION 
                (SELECT phone FROM user_staff WHERE crsid = :id)
                UNION 
                (SELECT phone FROM user_porters WHERE crsid = :id)
            ');
            $rows = $this->db->single();
            $mobile = $rows["phone"];
        }
        if (!$name) {
            $booker = $this->getUser($booker);
            $name = $booker["name"];
        }

        if ($this->getPunts($puntid, $timeFrom, $timeTo) and $this->getBookings($puntid, $timeFrom, $timeTo)) {
            //valid time slot
            // @todo add restrictions here
            // @todo allow modify record
            $this->db->query('INSERT INTO bookings (puntid, booker, name, mobile, time_from, time_to)
 								VALUES (:id,:crsid,:name,:mobile,:from, :to)');
            $this->database->bind(':id', $puntid);
            $this->database->bind(':crsid', $booker);
            $this->database->bind(':name', $name);
            $this->database->bind(':mobile', $mobile);
            $this->database->bind(':from', $timeFrom);
            $this->database->bind(':to', $timeTo);
            $this->database->execute();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /punts
     * @url GET /punts/$id
     */
    public function getPunts($id = null, $from = null, $to = null)
    {
        if ($id) {
            if ($from && $to) {
                $this->db->query('SELECT puntid FROM punts WHERE puntid=:id AND (
                                    (:to Between available_from AND available_to)
                                    OR
								    (:from Between available_from AND available_to)
									)');
                $this->db->bind(':from', $from);
                $this->db->bind(':to', $to);
            } else {
                $this->db->query('SELECT * FROM punts WHERE puntid=:id');
            }
            $this->db->bind(':id', $id);
        } else {
            $this->db->query('SELECT * FROM punts');
        }
        $rows = $this->db->resultset();
        return $rows; // serializes object into JSON
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /bookings
     * @url GET /bookings/$id
     * @url GET /bookings/$id/$from/$to
     */
    public function getBookings($id = null, $from = null, $to = null)
    {
        if ($id) {
            if ($from && $to) {
                $this->db->query('SELECT * FROM bookings WHERE puntid=:puntid AND 
                  time_from<=:to AND time_to>=:from');
                $this->db->bind(':from', $from);
                $this->db->bind(':to', $to);
            } else {
                $this->db->query('SELECT * FROM bookings WHERE puntid=:puntid');
            }
            $this->db->bind(':puntid', $id);
        } else {
            $this->db->query('SELECT * FROM bookings');
        }
        $rows = $this->db->resultset();
        return $rows; // serializes object into JSON
    }

    /**
     * Saves a user to the database
     *
     * @url POST /users
     * @url PUT /users/$id
     */
    public function saveUser($id = null, $data)
    {
        if ($this->admin) {
            $crsid = $id || test_input($data->crsid);
            $type = test_input($data->type);
            $admin = test_input($data->admin);
            if ($admin !== 0 || $admin !== 1) {
                $admin = 0;
            }
            $user = $this->getUser($crsid);
            $this->db->query('INSERT INTO user_:type (crsid, name, admin) 
                              VALUES (:crsid, :name, :admin)');
            switch ($type) {
                case 'MCR':
                    $this->db->bind(':type', 'mcr');
                    break;
                case 'UCS':
                    $this->db->bind(':type', 'ucs');
                    break;
                case 'FELLOW':
                    $this->db->bind(':type', 'fellows');
                    break;
                case 'STAFF':
                    $this->db->bind(':type', 'staff');
                    break;
                case 'PORTER':
                    $this->db->bind(':type', 'porters');
                    break;
            }
            $this->db->bind(':crsid', $crsid);
            $this->db->bind(':name', $user["name"]);
            $this->db->bind(':admin', $admin);
            $this->db->execute();
            return true;
        }
        return false;
    }

    /**
     * Throws an error
     *
     * @url GET /error
     */
    public function throwError()
    {
        throw new RestException(401, "Empty password not allowed");
    }
}
