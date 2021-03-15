<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/backend/DBManagement.php';

$url = $_SERVER['REQUEST_URI'];

$exploded_url = explode('/', $url);

http_response_code(200);

switch(end($exploded_url)){
    case "register":
        require __DIR__ . '/backend/register.php';
        break;
    case "login":
        require_once __DIR__ . '/backend/login.php';
        break;
    case "get_user_info":
        require_once __DIR__ . '/backend/get_user_info.php';
        break;
    case "get_transaction_list":
        require_once __DIR__ . '/backend/get_transaction_list.php';
        break;
    case "get_product":
        require_once __DIR__ . '/backend/get_product.php';
        break;
    case "get_products":
        require_once __DIR__ . '/backend/get_products.php';
        break;
    case "make_transaction":
        require_once __DIR__ . '/backend/make_transaction.php';
        break;
}
