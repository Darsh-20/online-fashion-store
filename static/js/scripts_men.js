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
        const products_men = [
            { id: 1, name: "T-Shirt", price: 400, description: "Comfortable cotton T-shirt.", image: "t-shirt.jpg" },
            { id: 2, name: "T-Shirt_ronaldo_2018", price: 1000, description: "Comfortable Sport T-shirt.", image: "t-shirt_ronaldo_2018.jpg" },
            { id: 3, name: "T-Shirt2", price: 600, description: "Comfortable cotton T-shirt.", image: "t-shirt2.jpg" },
            { id: 4, name: "T-Shirt3", price: 450, description: "Comfortable cotton T-shirt.", image: "t-shirt3.jpg" },
            { id: 5, name: "Hoody", price: 900, description: "Warm, trendy, practical", image: "hoody.jpg" },
            { id: 6, name: "Black_Hoody", price: 1000, description: "Comfortable cotton hody.", image: "black_hoody.jpg" },
            { id: 7, name: "Hoody2", price: 900, description: "Comfortable cotton hody.", image: "hoody2.jpg" },
            { id: 8, name: "Watch", price: 1500, description: "Stylish watch.", image: "watch.jpg" },
            { id: 9, name: "Sunglasses", price: 500, description: "Trendy sunglasses for all.", image: "sunglasses.jpg" },
            { id: 10, name: "Sunglasses2", price: 1200, description: "Trendy sunglasses for all.", image: "sunglasses2.jpg" },
            { id: 11, name: "Black_Shose", price: 1800, description: "Shose Classic.", image: "black_shose.jpg" },
            { id: 12, name: "Kotchi", price: 1300, description: "Trendy Shose Miror Original.", image: "Kotchi.jpg" }
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

