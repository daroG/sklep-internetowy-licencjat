<?php


require_once __DIR__ . '/DBManagement.php';


$name = "";
$surname = "";
$password = "";
$passwordConfirm = "";
$email = "";
$tel = "";
$address = "";
$city = "";
$zipCode = "";

$db = new DBManagement();
$conn = $db->getConnection();

$parameters = json_decode(file_get_contents("php://input"));

if(!!$parameters) {
    $name = isset($parameters->name) ? $parameters->name : "";
    $surname = isset($parameters->surname) ? $parameters->surname : "";
    $password = isset($parameters->password) ? $parameters->password : "";
    $passwordConfirm = isset($parameters->passwordConfirm) ? $parameters->passwordConfirm : "";
    $email = isset($parameters->email) ? $parameters->email : "";
    $tel = isset($parameters->tel) ? $parameters->tel : "";
    $address = isset($parameters->address) ? $parameters->address : "";
    $city = isset($parameters->city) ? $parameters->city : "";
    $zipCode = isset($parameters->zipCode) ? $parameters->zipCode : "";

}

$errors = [];

if($password !== $passwordConfirm){
    $errors[] = "Hasła różnią się od siebie";
}

if($name === ''){
    $errors[] = "Pole imię jest puste";
}
if($surname === ''){
    $errors[] = "Pole nazwisko jest puste";
}
if($password === ''){
    $errors[] = "Pole hasło jest puste";
}

if($password !== $passwordConfirm){
    $errors[] = "Hasła nie są takie same";
}

if($email === ''){
    $errors[] = "Pole email jest puste";
}

if($address === ''){
    $errors[] = "Pole adres jest puste";
}

if($city === ''){
    $errors[] = "Pole miasto jest puste";
}

if($zipCode === ''){
    $errors[] = "Kod pocztowy jest niepodany";
}

$code = "OK";

http_response_code(200);
if(!empty($errors)){
    $code = "ERROR";
}else if(!$db->createUser($name, $surname, $password, $email, $city, $zipCode, $address, $tel)){
    $errors[] = "Nie udało się utworzyć użytkownika";
    $code = "ERROR";
}

echo json_encode(["msg" => "Registration", "status" => $code, "errors" => $errors]);