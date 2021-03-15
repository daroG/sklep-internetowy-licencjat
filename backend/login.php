<?php


require_once __DIR__ . '/DBManagement.php';


$password = "";
$email = "";

$db = new DBManagement();
$conn = $db->getConnection();

$parameters = json_decode(file_get_contents("php://input"));

if (!!$parameters) {
    $password = isset($parameters->password) ? $parameters->password : "";
    $email = isset($parameters->email) ? $parameters->email : "";
}

$errors = [];

if ($password === '') {
    $errors[] = "Pole hasło jest puste";
}

if ($email === '') {
    $errors[] = "Pole email jest puste";
}

$dataToReturn = [];

$loginTry = $db->loginUser($email, $password);

if ($loginTry !== false) {
    $dataToReturn = [
        "msg" => $loginTry["message"],
        "status" => "OK",
        "errors" => $errors,
        "jwt" => $loginTry["jwt"],
        "expire" => $loginTry["expire"],
    ];
} else {
    $dataToReturn = ["msg" => "Logowanie nieudane", "status" => "ERROR", "errors" => ["błędne dane logowania"]];
//    http_response_code(401);
}

echo json_encode($dataToReturn);