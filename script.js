// Get HTML elements
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const cartButton = document.getElementById("cartButton");
const cartSection = document.getElementById("cartSection");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCart = document.getElementById("clearCart");

// Store products and cart items
let products = [];
let cart = [];

// Load products from JSON file using Fetch API
async function loadProducts() {

    try {

        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        displayProducts(products);

    } catch (error) {

        productContainer.innerHTML =
            "<p class='no-products'>Error loading products. Please run the website using Live Server.</p>";

        console.log(error);

    }
}

// Display products dynamically
function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML =
            "<p class='no-products'>No products found!</p>";

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}"
                 alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    Category: ${product.category}
                </p>

                <p class="rating">
                    ⭐ ${product.rating} / 5
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button class="add-cart-btn"
                        data-id="${product.id}">
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);

    });

}

// Add product to cart
function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (product) {

        cart.push(product);

        updateCart();

        alert(product.name + " added to cart!");

    }

}

// Update shopping cart
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString("en-IN")}</p>
            </div>

            <button class="remove-btn"
                    data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cartCount.textContent = cart.length;

    cartTotal.textContent = total.toLocaleString("en-IN");

}

// Handle Add to Cart button clicks
productContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("add-cart-btn")) {

        const id = Number(event.target.dataset.id);

        addToCart(id);

    }

});

// Remove product from cart
cartItems.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove-btn")) {

        const index = Number(event.target.dataset.index);

        cart.splice(index, 1);

        updateCart();

    }

});

// Search products
function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        return product.name.toLowerCase().includes(searchValue) ||
               product.category.toLowerCase().includes(searchValue);

    });

    displayProducts(filteredProducts);

}

// Search button click
searchBtn.addEventListener("click", searchProducts);

// Search while typing
searchInput.addEventListener("input", searchProducts);

// Open shopping cart
cartButton.addEventListener("click", function() {

    cartSection.classList.add("show");

});

// Close shopping cart
closeCart.addEventListener("click", function() {

    cartSection.classList.remove("show");

});

// Clear entire cart
clearCart.addEventListener("click", function() {

    cart = [];

    updateCart();

});

// Load products when the page opens
loadProducts();

// Initialize cart display
updateCart();