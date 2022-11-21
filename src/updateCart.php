<?php
    session_start();
    if(!isset($_SESSION['cart']))
	$_SESSION['cart'] = [];

    if(isset($_POST['id'])){
        if($_POST['action'] == 'add'){
            foreach ($_SESSION['cart'] as $key => $value) {
                if($value['id']== $_POST['id']){
                    $_SESSION['cart'][$key]['quantity']++;
                }
            }
        }
        if($_POST['action'] == 'minus'){
            foreach ($_SESSION['cart'] as $key => $value) {
                if($value['id']== $_POST['id']){
                    if($_SESSION['cart'][$key]['quantity'] == 1){
                        array_splice($_SESSION['cart'], $key, 1);
                    }
                    
                    else
                    $_SESSION['cart'][$key]['quantity']--;
                }
            }
        }
        if($_POST['action'] == 'delete'){
            foreach ($_SESSION['cart'] as $key => $value) {
                if($value['id']== $_POST['id']){
                    array_splice($_SESSION['cart'], $key, 1);
                }
            }
        }
        
        
    }
    echo json_encode($_SESSION['cart']);
