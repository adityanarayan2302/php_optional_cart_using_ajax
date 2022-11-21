$(document).ready(function(){
    $.ajax({
        type: "get",
        url: "../config.php",
        dataType: "json",
        contentType: "application/json",
        success: function (products) {
            console.log(products);
            //displaying products
            displayProducts(products);
            $(".add-to-cart").click(function (e) { 
                e.preventDefault();
                console.log($(this).attr("id"));
                var id =$(this).attr("id");
                $.ajax({
                    type: "post",
                    url: "../addToCart.php",
                    data: { id : id },
                    success: function (cart) {
                        //cart received in json format now parsing it in array format
                        var cart = JSON.parse(cart);
                        displayCart(cart, products);
                    }
                });
            });
            //updating the cart when add or minus is clicked
            $(document).on('click','.updateCart',function(){
                var btnId = $(this).attr("id");
                console.log(btnId);
                if(btnId.slice(0,3)=="add"){
                    var action = btnId.slice(0,3);
                    var prodID = btnId.slice(3);
                    $.ajax({
                        type: "post",
                        url: "../updateCart.php",
                        data: { id : prodID , action : action},
                        success: function (cart) {
                            
                            var cart = JSON.parse(cart);
                            console.log(cart);
                            displayCart(cart, products);
                        }
                    });
                }
                else{
                    var action = btnId.slice(0,5);
                    var prodID = btnId.slice(5);
                    $.ajax({
                        type: "post",
                        url: "../updateCart.php",
                        data: { id : prodID , action : action},
                        success: function (cart) {
                            var cart = JSON.parse(cart);
                            displayCart(cart, products);
                        }
                    });
                }
            });
            //deleting the whole value when delete button for particular array is clicked
            $(document).on('click','.deleteValue', function(){
                var btnId = $(this).attr("id").slice(6);
                var action = "delete";
                if(confirm("are you sude, you want to remove the item?"))
                    $.ajax({
                        type: "post",
                        url: "../updateCart.php",
                        data: { id : btnId , action : action},
                        success: function (cart) {
                            var cart = JSON.parse(cart);
                            displayCart(cart, products);
                        }
                    });
            });
           
        }
    });


    
});
//display function for product list
function displayProducts(products){
    console.log(products);
    var str = "";
    var c = 0;
    products.forEach(element => {
        str += `<div id="product-${element.id}" class="product">
        <img src="images/${element.image}">
        <h3 class="title"><a href="#">Product ${element.id}</a></h3>
        <span>Price: $${element.price}</span>
        <a class="add-to-cart" id="${c++}" href="#">Add To Cart</a>
    </div>`
    });
    $("#products").html(str);
}
//display function for cart items
function displayCart(cart, products){
    
    var str = `<table><tr><th>ID</th><th>Name</th><th>Image</th><th>Price</th><th>Quantity</th> </tr>`;
    var total = 0;
    cart.forEach(element => {
        str += `<tr><td>${products[element.id].id}</td><td>${products[element.id].name}</td><td><img src="images/${products[element.id].image}"></td><td>$ ${products[element.id].price}</td><td><button class="updateCart" id="minus${element.id}">-</button>${element.quantity}<button class="updateCart" id="add${element.id}">+</button> &emsp; <button class="deleteValue" id="delete${element.id}"><i class="fa fa-trash"></i></button></td></tr>`;
        total += products[element.id].price * element.quantity;
    });
    str += `<tr><th>Total = $ ${total}</th></tr></table>`;
    if(cart.length == 0) str ="";
    $("#cartDisplay").html(str);
}
