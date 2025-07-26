
const cartIcon= document.querySelector("#cart-icon");
const cart= document.querySelector(".cart");
const closeCart= document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}
//================ START ============================
function start(){
    addEvents();
}
//================ UPDATE ============================
function update(){
    addEvents();
    updateTotal();
}
//================ ADD EVENTS ============================
function addEvents(){
    //Remove items from the cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });
    //Change Quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity')
    cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
    });

    //Add items to cart
    let addCart_btns = document.querySelectorAll("#add-cart");
    addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
    });
}   

//================ HANDLE EVENTS FUNCTIONS ============================
let itemsAdded = [];

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    let img = product.querySelector(".cart-remove").src;
    console.log(title, price, imgSrc, img);

    let newToAdd = {
        title,
        price,
        imgSrc,
        img,
};

    //item that is already added
    if(itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This Item has Already Added");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }
    //add in the cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode); 

    update();
}

    function handle_removeCartItem(){
        this.parentElement.remove();
        itemsAdded = itemsAdded.filter(
            el => 
            el.title != 
            this.parentElement.querySelector(".cart-product-title").innerHTML
            );
    update();
}

function handle_changeItemQuantity() { 
    if (isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}
    //Buy order
    const buy_btn = document.querySelectorAll(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
    function handle_buyOrder(){
        if (itemsAdded.length <= 0){
            alert("There is no Order \n Order First Before Buying.");
        return;
        }
        const cartContent = cart.querySelector(".cart-content");
        cartContent.innerHTML = '';
        alert("Redirecting to Order Form");
    }

//================ UPDATE FUNCTIONS ============================
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total +=price * quantity; 
    });

    //make decimal point in 2
    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;
}




//================ HTML COMPONENTS ============================
function CartBoxComponent(title, price, imgSrc){
 return `
 <div class= "cart-box">
   <img src=${imgSrc} alt="" class="cart-img">
   <div class="detail-box">
       <div class="cart-product-title">${title}</div>
       <div class="cart-price">${price}</div>
       <input type="number" value="1" class="cart-quantity">
</div>
   <img src="${img}" class="cart-remove">	
</div>` ;
}