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


        if($data && isset($data->getAll) && $data->getAll == 'true'){
            $db = new DBManagement();
            $conn = $db->getConnection();

            $tmpUser = $db->getUserInfo($user['email']);
            if ($tmpUser){
                exit(json_encode(["msg" => "Uwierzytelniono", "type" => "all", "status" => "OK", "errors" => [], "user" => (array) $tmpUser]));
            }
        }

        echo json_encode(["msg" => "Uwierzytelniono", "status" => "OK", "errors" => [], "user" => $user]);

    }catch(Exception $e){
        echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => [$e->getMessage()]]);
    }

}else{
    echo json_encode(["msg" => "Nieuwierzytelniono", "status" => "ERROR", "errors" => ["Brak tokenu uwierzytelniającego"]]);
}
