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
    private $db;
    private $user;
    private $type;
    private $admin;


    /**
     * Checks whether user is authorised
     */
    public function authorize()
    {
        $this->db = new Database();
        $this->user = 'rjg70';//($_SERVER['REMOTE_USER']);
        $this->db->query('SELECT * FROM user WHERE crsid = :id');
        $this->db->bind(':id', $this->user);
        $row = $this->db->single();

        //print_r($row);
        if ($row) {
            if ($row["authorised"]) {
                $this->admin = $row["admin"];
                $this->type = $row["type"];
                return true;
            }
        }
        return false;
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /
     * @url GET /user
     * @url GET /user/$id
     * @param string $id
     * @return
     */
    public function getUser($id = null)
    {
        if ((!$this->admin && $id) || !$id) {
            $id = $this->user;
        }

        if ($id == '*') {
          $this->db->query('SELECT * FROM user');
          $row = $this->db->resultset();
          return $row;
        } else {
          $this->db->query('SELECT * FROM user WHERE crsid = :id');
          $this->db->bind(':id', $id);
          $row = $this->db->single();

          if (!$row["name"]) {
              $ds = ldap_connect("ldap.lookup.cam.ac.uk");
              $lsearch = ldap_search($ds, "ou=people,o=University of Cambridge,dc=cam,dc=ac,dc=uk", "uid=" . $id . "");
              $info = ldap_get_entries($ds, $lsearch);
              $name = $info[0]["cn"][0];
              $this->db->query('UPDATE user SET name=:name WHERE crsid=:id');
              $this->db->bind(':id', $id);
              $this->db->bind(':name', $name);
              $this->db->execute();
          }
          return $row;
        }
    }

    /**
     * update the user
     *
     * @url PUT /
     * @url PUT /user
     * @url PUT /user/$id
     * @param string $id
     * @param array $data set (phone and/or name) or (admin and/or authorised)
     * @throws RestException
     */
    public function updateUser($id = null, $data)
    {
        if (!($this->admin && $id)) {
            $id = $this->user;
        }

        if ($this->admin && $id != $this->user) {
            // Updating permissions
            if (isset($data->admin) && isset($data->authorised)) {
                $this->db->query('update user set authorised=:authorised, admin=:admin  where crsid=:id;');
                $this->db->bind(':authorised', test_input($data->authorised));
                $this->db->bind(':admin', test_input($data->admin));
            } elseif (isset($data->admin)) {
                $this->db->query('update user set admin=:admin  where crsid=:id;');
                $this->db->bind(':admin', test_input($data->admin));
            } elseif (isset($data->authorised)) {
                $this->db->query('update user set authorised=:authorised  where crsid=:id;');
                $this->db->bind(':authorised', test_input($data->authorised));
            } else {
                throw new RestException(204, 'No Content');
            }
        } else {
            // Updating Name or Mobile
            if ($data->name && $data->phone) {
                $this->db->query('update user set name=:name, phone=:phone  where crsid=:id;');
                $this->db->bind(':name', test_input($data->name));
                $this->db->bind(':phone', test_input($data->phone));
            } elseif ($data->name) {
                $this->db->query('update user set name=:name  where crsid=:id;');
                $this->db->bind(':name', test_input($data->name));
            } elseif ($data->phone) {
                $this->db->query('update user set phone=:phone  where crsid=:id;');
                $this->db->bind(':phone', test_input($data->phone));
            } else {
                throw new RestException(204, 'No Content');
            }
        }
        $this->db->bind(':id', $id);
        $this->db->execute();
        return;
    }

    /**
     * Adds the list of users
     *
     * @url POST /user
     */
    public function addUsers($data)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to modify Punt Users');
        }

        if (!isset($data->type)) {
            throw new RestException(404, 'Type required');
        }
        if (!isset($data->users) || !is_array($data->users)) {
            throw new RestException(404, 'Users array required');
        }
        $error = false;
        $this->db->beginTransaction();
        foreach ($data->users as $user) {
            $user = test_input($user);
            $this->db->query('INSERT INTO user (crsid, type) VALUES (:crsid, :type)');
            $this->db->bind(':crsid', $user);
            $this->db->bind(':type', test_input($data->type));
            try {
                $this->db->execute();
            } catch (PDOException $e) {
                $error = true;
                break;
            }
        }
        if ($error) {
            $this->db->cancelTransaction();
            throw new RestException(409, 'Error inserting');
        } else {
            $this->db->endTransaction();
        }

        return;
    }

    /**
     * Delete the user by id or current user
     *
     * @url DELETE /user/$id
     * @url DELETE /user/$id/$type
     */
    public function deleteUser($id = '*', $type = null)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to modify Users');
        }

        if (!isset($id)) {
          throw new RestException(204, 'No Content');
        }

        if ($id === '*' && isset($type)){
            $this->db->query('DELETE FROM user WHERE type=:type and admin=0');
            $this->db->bind('type', test_input($type));
            $this->db->execute();
        } elseif ($id === '*' && !isset($type)){
          $this->db->query('DELETE FROM user WHERE admin=0');
          $this->db->execute();
        }else{
            $this->db->query('DELETE FROM user WHERE crsid=:crsid');
            $this->db->bind(':crsid', $id);
            try {
                $this->db->execute();
            } catch (PDOException $e) {
                $error = true;
            }
        }
        if ($error) {
            throw new RestException(404, 'Not Found');
        }
        return;
    }

    /**
     * Gets the punt settings
     *
     * @url GET /settings
     * @url GET /settings/$type
     */
    public function getRules($type = "rules") {
        if (!isset($type)){
          $type = "rules";
        }
        $this->db->query('SELECT value FROM options WHERE item=:type');
        $this->db->bind(':type',$type);
        $row = $this->db->single();
        return $row;
    }

    /**
     * Update the punt rules
     *
     * @url PUT /settings
     * @url PUT /settings/$type
     */
    public function putRules($type = "rules" ,$data)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to modify Punt Settings');
        }

        if (!isset($type) || !$data->value) {
            throw new RestException(204, 'No Content received');
        }

        $this->db->query('update options set  value=:value  where item=:type;');
        $this->db->bind(':value', $data->value);
        $this->db->bind(':type', $type);
        $this->db->execute();
        return;
    }

    /**
     * Saves a booking to the database
     *
     * @url POST /booking
     */
    public function saveBooking($data)
    {

        $puntid = test_input($data->puntid);
        $booker = test_input($data->booker);
        $type = test_input($data->type);
        $name = test_input($data->name);
        $mobile = test_input($data->phone);
        $timeFrom = test_input($data->timeFrom);
        $timeTo = test_input($data->timeTo);

        if ($booker != $this->user && $this->admin == 0 && $this->type != "PORTER") {
            throw new RestException(404, 'Invalid permissions');
        };

        if (empty($puntid) || empty($booker) || empty($name) || empty($mobile) || empty($timeFrom) || empty($timeTo)) {
            throw new RestException(404, 'Missing Data');
        }

        if ($this->type === "PORTER" || $this->admin) {
            $permissions = (bool) $this->getPunts($puntid, $timeFrom, $timeTo) && !(bool) $this->getBookings($puntid, $timeFrom, $timeTo);
        } else {
            $upcoming = $this->getBookings(null, $timeFrom, null, null, $booker);
            $notAtLimit = true;
            if ($this->type === "MCR" || $this->type === "UCS") {
                $typeLimit = $this->getBookings(null, $timeFrom, $timeTo, $type, null);
                if (count($typeLimit) >= 3) {
                    $notAtLimit = false;
                }
            }
            $permissions = !(bool) $upcoming && $notAtLimit && (bool) $this->getPunts($puntid, $timeFrom, $timeTo) && !(bool) $this->getBookings($puntid, $timeFrom, $timeTo);
        }
        if ($permissions) {
            $this->db->query('INSERT INTO bookings (puntid, booker, name, user_type, phone, time_from, time_to)
 								VALUES (:id,:crsid,:name,:type,:mobile,:from, :to)');
            $this->db->bind(':id', $puntid);
            $this->db->bind(':crsid', $booker);
            $this->db->bind(':name', $name);
            $this->db->bind(':type', $type);
            $this->db->bind(':mobile', $mobile);
            $this->db->bind(':from', strftime('%Y-%m-%d %H:%M:%S', $timeFrom));
            $this->db->bind(':to', strftime('%Y-%m-%d %H:%M:%S', $timeTo));
            $this->db->execute();
        } else {
            throw new RestException(409, 'Permissions Invalid');
        }
        return;
    }

    /**
     * Gets the punts
     *
     * @url GET /punts
     * @url GET /punts/$id
     */
    public function getPunts($id = null, $from = null, $to = null)
    {
        if ($id) {
            if ($from && $to) {
                $this->db->query('SELECT id FROM punts WHERE id=:id AND (
                                    (:to Between available_from AND available_to)
                                    OR
								    (:from Between available_from AND available_to)
									)');
                $this->db->bind(':from', strftime('%Y-%m-%d %H:%M:%S', $from));
                $this->db->bind(':to', strftime('%Y-%m-%d %H:%M:%S', $to));
            } else {
                $this->db->query('SELECT * FROM punts WHERE id=:id');
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
     * @url GET /booking
     * @url GET /booking/$id
     * @url GET /booking/$id/$from
     * @url GET /booking/$id/$from/$to
     */
    public function getBookings($id = null, $from = null, $to = null, $type = null, $user = null)
    {
        if ($from) {
            $from = strftime('%Y-%m-%d %H:%M:%S', $from);
        }
        if ($to) {
            $to = strftime('%Y-%m-%d %H:%M:%S', $to);
        }
        if ($id === '*'){$id = null;}

        if ($id && $from && $to) {
            $this->db->query('SELECT * FROM bookings WHERE puntid=:puntid AND time_from<=:to AND time_to>=:from ORDER BY time_from DESC');
            $this->db->bind(':puntid', $id);
            $this->db->bind(':from', $from);
            $this->db->bind(':to', $to);
        } elseif ($id && $from) {
            $this->db->query('SELECT * FROM bookings WHERE puntid=:puntid AND time_to>=:from ORDER BY time_from DESC');
            $this->db->bind(':puntid', $id);
            $this->db->bind(':from', $from);
        } elseif ($id) {
            $this->db->query('SELECT * FROM bookings WHERE puntid=:puntid ORDER BY time_from DESC');
            $this->db->bind(':puntid', $id);
        } elseif ($from ) {
           $this->db->query('SELECT * FROM bookings WHERE time_to>=:from ORDER BY time_from DESC');
           $this->db->bind(':from', $from);
        } elseif ($type && $from && $to) {
            $this->db->query('SELECT * FROM bookings WHERE user_type=:type AND time_from<=:to AND time_to>=:from ORDER BY time_from DESC');
            $this->db->bind(':type', $type);
            $this->db->bind(':from', $from);
            $this->db->bind(':to', $to);
        } elseif ($user && $from) {
            $this->db->query('SELECT * FROM bookings WHERE booker=:crsid AND time_to>=:from ORDER BY time_from DESC');
            $this->db->bind(':crsid', $user);
            $this->db->bind(':from', $from);
        } else {
            $this->db->query('SELECT * FROM bookings ORDER BY time_from DESC');
        }
        $rows = $this->db->resultset();
        return $rows; // serializes object into JSON
    }

    /**
     * Deletes a booking to the database
     *
     * @url DELETE /booking/
     * @url DELETE /booking/$id
     */
    public function deleteBooking($id = null)
    {
        $error = false;
        if ($id) {
            if ($this->admin || $this->type === "PORTER") {
                $this->db->query('DELETE FROM bookings WHERE id=:id');
            } else {
                $this->db->query('DELETE FROM bookings WHERE booker=:crsid AND id=:id');
                $this->db->bind(':crsid', $this->user);
            }
            $this->db->bind(':id', $id);
            try {
                $this->db->execute();
            } catch (PDOException $e) {
                $error = true;
            }
        } else {
            //delete all upcoming
            if (!$this->admin) {
                throw new RestException(404, 'User Must be admin to modify Punt Rules');
            }
            $this->db->query('DELETE FROM bookings WHERE time_from >= CURDATE()');
            try {
                $this->db->execute();
            } catch (PDOException $e) {
                $error = true;
            }
        }
        if ($error) {
            throw new RestException(404, 'Not Found');
        }
        return;
    }

    /**
     * Add new punt
     *
     * @url POST /punts
     * @url POST /punts/$id
     */
    public function addPunts($data)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to add Punts');
        }

        if (!isset($data->name)) {
            throw new RestException(404, 'Name required');
        }
        if (!isset($data->from)) {
            throw new RestException(404, 'Available From required');
        }
        if (!isset($data->to)) {
            throw new RestException(404, 'Available To required');
        }
        $this->db->query('INSERT INTO punts (name, available_from,available_to) VALUES (:name, :from, :to)');
        $this->db->bind(':name', test_input($data->name));
        $this->db->bind(':from', strftime('%Y-%m-%d %H:%M:%S', test_input($data->from)));
        $this->db->bind(':to', strftime('%Y-%m-%d %H:%M:%S', test_input($data->to)));
        $this->db->execute();
        return $this->db->lastInsertId();
    }

    /**
     * Update punt
     *
     * @url PUT /punts/$id
     */
    public function updatePunts($id = null, $data)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to modify Punts');
        }

        if (!isset($id)) {
            throw new RestException(404, 'Id');
        }
        if (!isset($data->from)) {
            throw new RestException(404, 'Available From required');
        }
        if (!isset($data->to)) {
            throw new RestException(404, 'Available To required');
        }
        $this->db->query('UPDATE punts SET available_from=:from ,available_to=:to WHERE id=:id');
        $this->db->bind(':id', $id);
        $this->db->bind(':from', strftime('%Y-%m-%d %H:%M:%S', test_input($data->from)));
        $this->db->bind(':to', strftime('%Y-%m-%d %H:%M:%S', test_input($data->to)));
        $this->db->execute();
        return;
    }

    /**
     * Delete punt
     *
     * @url DELETE /punts/$id
     */
    public function deletePunts($id)
    {
        if (!$this->admin) {
            throw new RestException(404, 'User Must be admin to delete Punts');
        }
        if (!isset($id)) {
            throw new RestException(404, 'Id required');
        }
        $this->db->query('DELETE FROM punts WHERE id=:id');
        $this->db->bind(':id', $id);
        $this->db->execute();
        return; // serializes object into JSON
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
