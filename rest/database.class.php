<?php
/**
 * PDO Database class for mysql copied from:
 * http://culttt.com/2012/10/01/roll-your-own-pdo-php-class/
 *
 * @Author rjg70
 * @created 5/9/2014
 * @Modified 5/9/2014
 */
class Database{
	/**
 	 * Define Private variables
	 *
	 * @var $host database host
	 * @var $user database user
	 * @var $pass database password
	 * @var $dbname database name
	 */
    private $host      = DB_HOST;
    private $user      = DB_USER;
    private $pass      = DB_PASS;
    private $dbname    = DB_NAME;
 
	/**
	 * @var $dbh database handle
	 * @var $error deal with errors
	 */
    private $dbh;
    private $error;
    
	/**
	 * @stmt $tmt SQL statement
	 */
 	private $stmt;
 	
 	/**
 	 * Connect to database upon class initiation
 	 */
    public function __construct()
    {
        // Set DSN
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
        // Set options
        $options = array(
            PDO::ATTR_PERSISTENT    => true,
            PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        );
        // Create a new PDO instanace
        try{
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
        }
        // Catch any errors
        catch(PDOException $e){
            $this->error = $e->getMessage();
        }
    }
    /**
     *Send database query
     *
     * @param $query
     */
    public function query($query)
    {
    	$this->stmt = $this->dbh->prepare($query);
	}
	/**
     * bind paramaters to query
     *
     * @param $param is the placeholder value that we will be using in our SQL statement, example :name.
     * @param $value is the actual value that we want to bind to the placeholder, example “John Smith”.
     * @param $type is the datatype of the parameter, example string.
     */
	public function bind($param, $value, $type = null)
	{
		/**
		 * Next we use a switch statement to set the datatype of the parameter
		 */
 		if (is_null($type)) 
 		{
  			switch (true) 
  			{
    			case is_int($value):
      				$type = PDO::PARAM_INT;
      				break;
    			case is_bool($value):
      				$type = PDO::PARAM_BOOL;
      				break;
    			case is_null($value):
      				$type = PDO::PARAM_NULL;
      				break;
    			default:
      				$type = PDO::PARAM_STR;
  			}
		}
		/**
		 * Bind the value
		 */
		$this->stmt->bindValue($param, $value, $type);
	}
	/**
     * execute the SQL query
     */
	public function execute()
	{
    	return $this->stmt->execute();
	}
	/**
     * The Result Set function returns an array of the result set rows. 
     * It uses the PDOStatement::fetchAll PDO method. 
     * First we run the execute method, then we return the results.
     */
    public function resultset()
    {
    	$this->execute();
    	return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	/**
	 *Very similar to the previous method, the Single method simply returns a 
	 * single record from the database. Again, first we run the execute method, 
	 * then we return the single result. This method uses the PDO method 
	 * PDOStatement::fetch.
	 */
	public function single()
	{
    	$this->execute();
    	return $this->stmt->fetch(PDO::FETCH_ASSOC);
	}
	/**
	 * Row Count
	 * The next method simply returns the number of effected rows from the 
	 * previous delete, update or insert statement. This method use the PDO 
	 * method PDOStatement::rowCount.
	 */
	public function rowCount()
	{
    	return $this->stmt->rowCount();
	}
	/**
	 *Last Insert Id
	 * The Last Insert Id method returns the last inserted Id as a string. 
	 * This method uses the PDO method PDO::lastInsertId.
	 */
	public function lastInsertId()
	{
    	return $this->dbh->lastInsertId();
	}
	/**
	 * Transactions
	 * Transactions allows you to run multiple changes to a database all in one 
	 * batch to ensure that your work will not be accessed incorrectly or there 
	 * will be no outside interferences before you are finished. If you are 
	 * running many queries that all rely upon each other, if one fails an 
	 * exception will be thrown and you can roll back any previous changes to 
	 * the start of the transaction.
	 *
	 * For example, say you wanted to enter a new user into your system. 
	 * The create new user insert worked, but then you had to create the user 
	 * configuration details in a separate statement. If the second statement 
	 * fails, you could then roll back to the beginning of the transaction.
	 *
	 * Transactions also prevent anyone accessing your database from seeing 
	 * inconsistent data. For example, say we created the user but someone 
	 * accessed that data before the user configuration was set. The accessing 
	 * user would see incorrect data (a user without configuration) which could 
	 * potentially expose our system to errors.
	 *
	 * To begin a transaction:
	 */
	public function beginTransaction()
	{
    	return $this->dbh->beginTransaction();
	}
	/**
	 * To end a transaction
	 */
	public function endTransaction()
	{
    	return $this->dbh->commit();
	}
	/**
	 *To Cancel a transaction
	 */
	public function cancelTransaction()
	{
    	return $this->dbh->rollBack();
	}
	/**
	 *Debug Dump Parameters
	 *The Debut Dump Parameters methods dumps the the information that 
	 * was contained in the Prepared Statement. This method uses the 
	 * PDOStatement::debugDumpParams PDO Method.
	 */
	public function debugDumpParams()
	{
    	return $this->stmt->debugDumpParams();
	}
}
?>