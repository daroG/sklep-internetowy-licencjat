<?php
require_once __DIR__ . "/../vendor/autoload.php";
use Firebase\JWT\JWT;

JWT::$leeway = 10;

const SECRET_KEY = "ab8w>[E'<+&#2Fy";

class DBManagement
{
    private $connection;

    private $user = "root";
    private $password = "";
    private $dbname = "testy";
    private $host = "localhost";

    public function getConnection(){

        $this->connection = null;

        try{
            $this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbname, $this->user, $this->password);
            $this->connection->query('SET NAMES utf8');
            $this->connection->query('SET CHARACTER_SET utf8_unicode_ci');
        }catch(PDOException $exception){
            echo "Cannot connect to database " . $exception->getMessage();
        }



        return $this->connection;
    }

    public function createUser($name, $surname, $password, $email, $city, $zipCode, $address, $phone){

        $query = "INSERT INTO users (name, surname, email, password, phone, address, city, zipCode) VALUES (:name, :surname, :email, :password, :phone, :address, :city, :zipCode)";

        if(!$this->connection){
            $this->getConnection();
        }

        $stmt = $this->connection->prepare($query);

        $pass_hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":surname", $surname);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":city", $city);
        $stmt->bindParam(":password", $pass_hash);
        $stmt->bindParam(":phone", $phone);
        $stmt->bindParam(":zipCode", $zipCode);
        $stmt->bindParam(":address", $address);

        if($stmt->execute()){
            return true;
        }else{
            print_r($stmt->errorInfo());
            return false;
        }



    }

    public function loginUser($email, $password){
        $stmt = $this->connection->prepare("SELECT id, name, surname, password FROM users WHERE email = :email LIMIT 1");

        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if($stmt->rowCount() === 0){
            return false;
        }

        $user = $stmt->fetchObject();

        if(password_verify($password, $user->password)){


            $issuer = "LOCALHOST";
            $audience = "sklep-internetowy.loc";
            $initiatedAt = time();
            $notBefore = time() + 10;
            $expire = time() + 5*60;
            $token = [
                "iss" => $issuer,
                "aud" => $audience,
                "iat" => $initiatedAt,
                "nbf" => $notBefore,
                "exp" => $expire,
                "data" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "surname" => $user->surname,
                    "email" => $email,
                ],
            ];

            $jwt = JWT::encode($token, SECRET_KEY);

            return [
                "message" => "Zalogowano poprawnie",
                "jwt" => $jwt,
                "email" => $email,
                "expire" => $expire,
            ];
        }
        return false;

    }

    public function getUserInfo($email){
        $stmt = $this->connection->prepare("SELECT id, name, surname, email, password, phone, address, city, zipCode FROM users WHERE email = :email LIMIT 1");

        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if($stmt->rowCount() === 0){
            return false;
        }

        $user = $stmt->fetchObject();

        return $user;

    }

    public function getUserTransactionsInfo($userId){
        $stmt = $this->connection->prepare("SELECT transactions.id, status, transactions.created_at, product_id, final_price, quantity, thumbnail, products.name as p_name, transactions.name, surname, email, tel, address, city, zipCode FROM transactions JOIN orders ON transactions.id = orders.transaction_id JOIN products ON products.id = orders.product_id WHERE user_id = :userId");
        $stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
        $stmt->execute();

        if($stmt->rowCount() === 0) {
            return [];
        }

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $transactions = [];

        foreach ($result as $order) {
            if( !array_key_exists($order['id'], $transactions))
                $transactions[$order['id']] = [];
            $transactions[$order['id']][] = $order;
        }

        return $transactions;
    }

    public function getProducts(){

        $products = [];

        $stmt1 = $this->connection->prepare("SELECT id, name, thumbnail, price, description, created_at, category_id FROM products ORDER BY created_at DESC");
        $stmt1->execute();

        $stmt2 = $this->connection->prepare("SELECT product_id, src, alt FROM product_images");
        $stmt2->execute();
        $images = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        foreach($stmt1->fetchAll(PDO::FETCH_ASSOC) as $product){
            $product['images'] = [];
            foreach($images as $image)
                if($image['product_id'] === $product['id'])
                    $product['images'][] = $image;

            $products[] = $product;
        }



        return $products;

    }

    public function getProduct($id){
        $product = [];
        $stmt1 = $this->connection->prepare("SELECT id, name, thumbnail, price, description, created_at FROM products WHERE id = ? LIMIT 1");
        $stmt1->execute([$id]);
        $product = $stmt1->fetch(PDO::FETCH_ASSOC);

        $stmt2 = $this->connection->prepare("SELECT product_id, src, alt FROM product_images WHERE product_id = ?");
        $stmt2->execute([$id]);
        $images = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        $product['images'] = $images === false ? [] : $images;


        return $product;
    }

    public function makeTransaction($userId, $name, $surname, $email, $tel, $address, $city, $zipCode){
        $stmt = $this->connection->prepare("INSERT INTO transactions (user_id, name, surname, email, tel, address, city, zipCode) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $name, $surname, $email, $tel, $address, $city, $zipCode]);
        return $this->connection->lastInsertId();
    }

    public function addCartToTransaction($cart, $transactionId){
        try{
            foreach ($cart as $cartItem) {
                $stmt = $this->connection->prepare("INSERT INTO orders (transaction_id, product_id, quantity, final_price) VALUES(?, ?, ?, ?)");
                $stmt->execute([$transactionId, $cartItem->id, $cartItem->count, $cartItem->price * $cartItem->count]);
            }
        }catch(PDOException $e){
            return $e;
        }

        return true;

    }

    public static function log($str){
        $file = fopen("logi.txt", "a+");
        fwrite($file, $str);
        fclose($file);
    }
}