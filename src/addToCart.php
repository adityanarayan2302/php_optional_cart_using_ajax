<?php
    session_start();
    if(!isset($_SESSION['cart']))
	$_SESSION['cart'] = [];

    if(isset($_POST['id'])){
        $arr = $_POST;
        $flag = 0;
        //adding values to the cart
        foreach ($_SESSION['cart'] as $key => $value) {
            if($value['id'] == $arr['id']){
            $_SESSION['cart'][$key]['quantity']++;
            $flag = 1;
            }
        }
        if($flag == 0){
            $arr['quantity'] = 1;
            array_push($_SESSION['cart'], $arr);
        }
    }
    //returning the data in json format
    echo json_encode($_SESSION['cart']);

?>