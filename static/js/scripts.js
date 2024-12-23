document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            addProductToCart(productId);
        });
    });

    function addProductToCart(productId) {
        const product = getProductById(productId);
        if (product) {
            cart.push(product);
            updateCartUI();
        }
    }

    // Get product by ID
    function getProductById(productId) {
        const products = [
            { id: 1, name: "bangle", price: 600, description: "Accessories", image: "bangle.jpg" },
            { id: 2, name: "pullover", price: 1300, description: "Gozy, stylish, versatile", image: "pullover.jpg" },
            { id: 3, name: "goat", price: 1800, description: "Warm, trendy, practical", image: "goat.jpg" },
            { id: 4, name: "suit", price: 1600, description: "Trendy, stylish.", image: "suit.jpg" },
            { id: 5, name: "silver_rings", price: 1500, description: "Elegant accessories.", image: "silver_rings.jpg" },
            { id: 6, name: "sport_shoes", price: 2000, description: "Trendy shoes for all.", image: "sport_shoes.jpg" }
        ];

        return products.find(product => product.id === parseInt(productId));
    }

    // Update the cart UI
    function updateCartUI() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceContainer = document.getElementById('total-price');

        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((product, index) => {
            totalPrice += product.price;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${product.name} - ${product.price} EGP</p>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
            cartItemsContainer.appendChild(itemDiv);

            // Add delete functionality
            const deleteButton = itemDiv.querySelector('.delete-item');
            deleteButton.addEventListener('click', () => deleteProductFromCart(index));
        });

        totalPriceContainer.textContent = totalPrice;
    }

    // Delete product from cart
    function deleteProductFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }
});

