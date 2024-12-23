# online-fashion-store
Online Store Project
An e-commerce application built using Flask, HTML, CSS, and JavaScript, showcasing products with interactive features such as product details, adding to cart, and dynamic API functionality.

Features
Product Catalog: Displays a list of products, including images, names, prices, and a button to add items to the cart.
Product Details: Allows users to view detailed information about a specific product.
Add to Cart: Adds selected products to a cart and stores them in local storage.
Dynamic Product Management: Add new products to the catalog via a form and display them dynamically.
Responsive Design: Supports mobile, tablet, and desktop views using media queries.
API Integration:
GET request to fetch all products.
POST request to add new products to the catalog.
Custom Error Handling: Displays a user-friendly 404 error page for invalid routes.

Usage
Adding a New Product
Go to the homepage.
Use the "Add Product" form to enter product details (name, price, and image).
Click "Submit" to dynamically add the product to the catalog.
Viewing Product Details
Click the "View Details" button under any product to see its detailed description and features.
Managing the Cart
Use the "Add to Cart" button to save products in the cart. Cart items are stored locally using local storage.
API Endpoints
GET /api/products: Fetch all products as JSON.
POST /api/products: Add a new product. Send a JSON object with id, name, price, and image fields.
Technologies Used
Backend: Flask
Frontend: HTML, CSS, JavaScript
Styling: Responsive design with media queries
Storage: Local Storage for cart items, Cookies for user preferences
Troubleshooting
If images are not loading, ensure they are placed in the static/images/ directory and referenced correctly using url_for('static', filename='images/your_image.jpg').
Ensure Flask is installed and the server is running properly.
Future Enhancements
Add user authentication for login/logout functionality.
Implement a fully-featured shopping cart with quantity adjustments.
