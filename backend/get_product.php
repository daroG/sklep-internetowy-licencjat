<?php

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . '/DBManagement.php';

http_response_code(200);


$db = new DBManagement();
$conn = $db->getConnection();

$parameters = json_decode(file_get_contents("php://input"));
if(isset($parameters->id)){
    echo json_encode($db->getProduct(intval($parameters->id)));
}else{
    echo json_encode($db->getProducts());
}


//
//echo json_encode([
//    "id" => 1, "name" => "Pierwszy produkt", "thumbnail" => "http://via.placeholder/100", "price" => 14999, "description" => "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor, magna in dictum vestibulum, augue neque laoreet purus, ac dapibus tellus tortor et orci. Maecenas interdum tellus in laoreet pretium. Pellentesque rutrum nibh ut arcu tristique, sit amet tincidunt justo malesuada. Pellentesque nec tempor nisl. Suspendisse ut libero sagittis, ullamcorper ligula sit amet, sodales neque. Aliquam quis lacinia sapien. Nulla tincidunt, ante sit amet vestibulum gravida, felis arcu ultrices sem, at dictum purus dui vel libero. Mauris lorem est, blandit id mi eget, lacinia fermentum eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n" .
//        "</p><p>" .
//        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi nulla leo, tempus et erat et, eleifend maximus dui. Nulla odio tortor, molestie quis bibendum a, facilisis in dui. Proin a libero eget lacus gravida ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at placerat nulla, sed venenatis sapien. Proin euismod massa libero, in egestas justo pulvinar quis. Cras ornare turpis eu accumsan bibendum. Aliquam arcu lorem, interdum malesuada velit nec, rhoncus elementum tortor.\n" .
//        "</p><p>" .
//        "Nulla gravida laoreet eleifend. Etiam laoreet velit tellus, consectetur euismod sem imperdiet et. Praesent rhoncus vel dui sit amet tincidunt. Praesent ultrices ligula eget lacus gravida gravida. Praesent ac venenatis turpis. Nam et nunc mauris. Mauris vitae enim id urna efficitur sodales. Maecenas eget euismod ex. Nullam aliquam nec nulla at scelerisque. Cras accumsan, lacus in pulvinar egestas, sapien ante dignissim nisl, facilisis mollis urna velit at ex.\n" .
//        "</p><p>" .
//        "Donec non ex non nunc suscipit imperdiet. Phasellus quis leo nec libero elementum suscipit. Nullam iaculis in nisl posuere varius. Aenean elementum libero a feugiat vehicula. Curabitur bibendum tellus libero, ac posuere odio blandit ac. Mauris viverra arcu eros, sed aliquet massa accumsan vitae. Ut non laoreet urna. Etiam volutpat lacinia odio eget convallis. In sed diam diam.\n" .
//        "</p><p>" .
//        "Donec egestas sem a leo hendrerit porttitor. Maecenas vestibulum pharetra consectetur. Nulla blandit interdum mauris sed efficitur. Sed at dapibus massa, a eleifend lorem. Donec quis leo eget dui lobortis fermentum eu nec mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras non ultrices purus.</p>",
//    "images" => [
//        [
//            "src" => 'http://via.placeholder.com/550',
//            "alt" => 'Pierwsze zdjęcie'
//        ],
//        [
//            "src" => 'http://via.placeholder.com/550',
//            "alt" => 'Drugie zdjęcie'
//        ],
//    ]
//
//]);