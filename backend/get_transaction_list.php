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

$db = new DBManagement();
$conn = $db->getConnection();

if($jwt){

    try{
        $decoded = JWT::decode($jwt, SECRET_KEY, ['HS256']);

        $user = (array) $decoded->data;



        if($user){
            $db = new DBManagement();
            $conn = $db->getConnection();

            $transactionInfo = $db->getUserTransactionsInfo($user['id']);
            if ($transactionInfo){
                echo(json_encode(["msg" => "Działa", "type" => "array", "status" => "OK", "errors" => [], "transactions" => $transactionInfo]));
            }else{
                echo(json_encode(["msg" => "Nie działa", "type" => "array", "status" => "ERROR", "errors" => [], "transactions" => $transactionInfo]));
            }
        }else{
            echo json_encode(["msg" => "Uwierzytelniono", "status" => "OK", "errors" => [], "user" => $user]);
        }


    }catch(Exception $e){
        echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => [$e->getMessage()]]);
    }

}else{
    echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => ["Brak tokenu uwierzytelniającego"]]);
}
