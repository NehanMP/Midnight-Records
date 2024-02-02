// Cart
let cartIcon = document.querySelector('#cart-icon'); // Get the cart icon element
let cart = document.querySelector('.cart'); // Get the cart container element
let closeCart = document.querySelector('#close-cart'); // Get the close cart icon element

// Opening the Cart
cartIcon.onclick = () => {
    cart.classList.add("active"); // Add the "active" class to show the cart
};

// Closing the cart
closeCart.onclick = () => {
    cart.classList.remove("active"); // Remove the "active" class to hide the cart
};

// Cart content
// Check if the document is still loading, if so, wait for the "DOMContentLoaded" event, otherwise, call the "ready" function directly
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Functions logic
function ready(){
    // Removing items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeItem); // Add click event listener to each "remove" button

        // Count of albums
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener("change", noOfAlbums); // Add "change" event listener to each quantity input field
        }

        // Add items to cart
        var addCart = document.getElementsByClassName("add-cart");
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener("click", addToCart); // Add click event listener to each "Add to Cart" button
        }

        // Buy albums
        document
            .getElementsByClassName('btn-buy')[0]
            .addEventListener('click', Buy); // Add click event listener to the "Buy" button
    }
}

// Function to open the cart
function openCart() {
    cart.classList.add("active"); // Add the "active" class to show the cart
}

// Removing items from cart
function removeItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove(); // Remove the parent element of the "remove" button (the entire cart box)
    calTotal(); // Recalculate the total price after removing the item
}

// Count of albums
function noOfAlbums(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1; // If the input value is not a number or less than or equal to 0, reset it to 1
    }
    calTotal(); // Recalculate the total price after changing the quantity
}

// Add items to cart
function addToCart(event){
    var button = event.target;
    var Products = button.parentElement;
    var title = Products.getElementsByClassName('product-title')[0].innerText; // Get the product title
    var price = Products.getElementsByClassName('price')[0].innerText; // Get the product price
    var albumImg = Products.getElementsByClassName('product-img')[0].src; // Get the product image source
    addAlbumToCart(title, price, albumImg); // Call the function to add the selected album to the cart
    calTotal(); // Recalculate the total price after adding the item
    openCart(); // Open the cart after adding the item
}

// Function to add the selected album to the cart
function addAlbumToCart(title, price, albumImg) {
    // Create a new cart box element and set its content based on the selected album
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var itemNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < itemNames.length; i++) {
        if (itemNames[i].innerText == title) {
            alert('This item is already in the cart.'); // Check if the item is already in the cart, show an alert, and return to prevent duplicates
            return;
        }
    }

    var cartBoxContent = 
        `<img src="${albumImg}" alt="" class="product-img">
        <div class="detail-box">
            <div class="cart-product-title"><b>${title}</b></div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart content-->
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent; // Add the content to the cart box element
    cartItems.append(cartShopBox); // Add the cart box element to the cart container

    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeItem); // Add click event listener to the "remove" button inside the cart box
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', noOfAlbums); // Add "change" event listener to the quantity input field inside the cart box
}

// Total calculation
function calTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    // Iterating through each album in the cart
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", "")); // Get the price and convert it to a number
        var quantity = quantityElement.value; // Get the quantity value
        total = total + (price * quantity); // Calculate the total price by multiplying price and quantity
    }
    document.getElementsByClassName("total-price")[0].innerText = "$" + total; // Update the total price displayed in the cart
}

function Buy() {
	// Get references to the delivery express checkbox, user name input, and user email input
	const deliveryExpressCheckbox = document.getElementById("delivery-express");
	const userNameInput = document.getElementById("user-name");
	const userEmailInput = document.getElementById("user-email");

	// Get the value of the delivery express checkbox, user name, and user email after trimming leading/trailing whitespace
	const deliveryExpress = deliveryExpressCheckbox.checked ? "Yes" : "No";
	const userName = userNameInput.value.trim();
	const userEmail = userEmailInput.value.trim();

	// Check if the user name or email is missing, if so, show an alert and return to prevent placing the order
	if (!userName || !userEmail) {
		alert("Please enter your name and email before placing the order.");
		return;
	}

	// Show a thank you message for choosing MR Entertainment products and display the delivery express status
	alert(`Thank you for choosing MR Entertainment products. Your order is placed successfully!\nDelivery-Express: ${deliveryExpress}`);

	// Reset the delivery express checkbox and text inputs after the order is placed
	deliveryExpressCheckbox.checked = false;
	userNameInput.value = "";
	userEmailInput.value = "";

	// Clear the cart content after the order is placed
	var cartContent = document.getElementsByClassName("cart-content")[0];
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}

	// Recalculate the total price in the cart after clearing it
	calTotal();
}


