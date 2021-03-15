<?php

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . '/DBManagement.php';

http_response_code(200);

$db = new DBManagement();
$conn = $db->getConnection();

$products = $db->getProducts();

echo json_encode($products);