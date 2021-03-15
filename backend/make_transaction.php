<?php

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . '/DBManagement.php';


use Firebase\JWT\JWT;


$data = json_decode(file_get_contents("php://input"));
$jwt = null;


if(array_key_exists("Authorization", apache_request_headers())){
    $authHeader = explode(" ", apache_request_headers()["Authorization"]);
    $jwt = $authHeader[1];
}

http_response_code(200);

if($jwt){

    try{
        $decoded = JWT::decode($jwt, SECRET_KEY, ['HS256']);

        $user = (array) $decoded->data;

        if($data && isset($data->name) && isset($data->surname) && isset($data->email)
            && isset($data->tel) && isset($data->address)
            && isset($data->city) && isset($data->zipCode)
            && isset($data->cart)
        ){

            $db = new DBManagement();
            $conn = $db->getConnection();

            $transactionId = $db->makeTransaction($user['id'], $data->name, $data->surname, $data->email, $data->tel, $data->address, $data->city, $data->zipCode);

            $cart = (array) $data->cart;

            $result = $db->addCartToTransaction($cart, $transactionId);
            if($result === true){
                echo json_encode(["msg" => "zamówiono", "status" => "OK", "errors" => []]);
            }else{
                echo json_encode(["msg" => "Niezamówiono", "status" => "ERROR", "errors" => [$result]]);
            }

        }else{
            echo json_encode(["msg" => "Niezamówiono", "status" => "ERROR", "errors" => ["nie można zamówić"]]);
        }


    }catch(Exception $e){
        echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => [$e->getMessage()]]);
    }

}else{
    echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => ["Brak tokenu uwierzytelniającego"]]);
}
