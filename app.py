from flask import Flask, request, jsonify, render_template, redirect, url_for, session, make_response, flash

app = Flask(__name__)

app.secret_key = '7777'

# قاعدة بيانات المستخدمين (بدون قاعدة بيانات حقيقية - مجرد محاكاة)
users_db = {}

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        rememberMeCheck = request.form.get('rememberMe')

        if email in users_db and users_db[email]['password'] == password:
            session['user'] = email
            session['username'] = users_db[email]['user_name']
            response = make_response(jsonify({"success": True, "email": email}))
            response.set_cookie('login_check', 'True', max_age=7*24*60*60, httponly=False)
            if rememberMeCheck == '1':
                response.set_cookie('remember_email', email, max_age=7*24*60*60)
                response.set_cookie('remember_me', users_db[email]['user_name'], max_age=7*24*60*60)
                response.set_cookie('remember_me_check', 'True', max_age=14*24*60*60)
                return response
            else:
                response.set_cookie('remember_me_check', '', expires=0)
                return response
        else:
            return jsonify({"success": False, "error": "Invalid email or password"}), 401

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user_name = request.form['user_name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if email in users_db:
            return jsonify(success=False, error="Email already exists."), 400

        for user in users_db.values():
            if user['user_name'] == user_name:
                return jsonify(success=False, error="Username already exists."), 400

        if password != confirm_password:
            return jsonify(success=False, error="Passwords do not match."), 400

        users_db[email] = {
            'user_name': user_name,
            'password': password,
            'email': email
        }
        return jsonify(success=True, message="Account created successfully!"), 200

    return render_template('signup.html')

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('login')))
    if 'user' in session:
        session.clear()
        response.set_cookie('remember_email', '', expires=0)
        response.set_cookie('remember_me', '', expires=0)
        response.set_cookie('remember_me_check', '', expires=0)
        response.set_cookie('login_check', '', expires=0)
    return response

# بيانات المنتجات
products_men = [
    {"id": 1, "name": "T-Shirt", "category": "Clothes", "price": 400, "description": "Comfortable cotton T-shirt.", "image": "t-shirt.jpg"},
    {"id": 2, "name": "T-Shirt_ronaldo_2018", "category": "Clothes", "price": 1000, "description": "Comfortable Sport T-shirt.", "image": "t-shirt_ronaldo_2018.jpg"},
    {"id": 3, "name": "T-Shirt2", "category": "Clothes", "price": 600, "description": "Comfortable cotton T-shirt.", "image": "t-shirt2.jpg"},
    {"id": 4, "name": "T-Shirt3", "category": "Clothes", "price": 450, "description": "Comfortable cotton T-shirt.", "image": "t-shirt3.jpg"},
    {"id": 5, "name": "Hoody", "category": "Clothes", "price": 900, "description": "Comfortable cotton hoody.", "image": "hoody.jpg"},
    {"id": 6, "name": "Black_Hoody", "category": "Clothes", "price": 1000, "description": "Comfortable cotton hoody.", "image": "black_hoody.jpg" },
    {"id": 7, "name": "Hoody2", "category": "Clothes", "price": 900, "description": "Comfortable cotton hoody.", "image": "hoody2.jpg"},
    {"id": 8, "name": "Watch", "category": "Watches", "price": 1500, "description": "Stylish watch.", "image": "watch.jpg"},
    {"id": 9, "name": "Sunglasses", "category": "Accessories", "price": 500, "description": "Trendy sunglasses for all.", "image": "sunglasses.jpg"},
    {"id": 10, "name": "Sunglasses2", "category": "Accessories", "price": 1200, "description": "Trendy sunglasses for all.", "image": "sunglasses2.jpg"},
    {"id": 11, "name": "Black_Shose", "category": "Shoses", "price": 1800, "description": "Shose Classic.", "image": "black_shose.jpg"},
    {"id": 12, "name": "Kotchi", "category": "Shoses", "price": 1300, "description": "Trendy Shose Miror Original.", "image": "kotchi.jpg"},
]

products = [
    {"id": 1, "name": "bangle", "category": "Bangle", "price": 600, "description": "Accessories", "image": "bangle.jpg"},
    {"id": 2, "name": "pullover", "category": "Clothes", "price": 1300, "description": "Gozy, stylish, versatile", "image": "pullover.jpg"},
    {"id": 3, "name": "goat", "category": "Clothes", "price": 1800, "description": "Warm, trendy, practical", "image": "goat.jpg"},
    {"id": 4, "name": "suit", "category": "Clothes", "price": 1600, "description": "Trendy, stylish.", "image": "suit.jpg"},
    {"id": 5, "name": "silver_rings", "category": "Rings", "price": 1500, "description": "Elegant accessories.", "image": "silver_rings.jpg"},
    {"id": 6, "name": "sport_shoes", "category": "Shoes", "price": 2000, "description": "Trendy shoes for all.", "image": "sport_shoes.jpg"},
]

product_hoody = {
    "name": "Black_Hoody",
    "price": 1000,
    "colors": ["#FF5733", "#33C1FF", "#2ECC71", "#8E44AD"],
    "description": "A stylish and comfortable black hoodie made from high-quality cotton blend. Perfect for casual outings or layering on colder days. This hoodie features a cozy, soft interior wit.",
    "image": "static/images/black_hoody.jpg"
}


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/product_men')
def product_men():
    return render_template('product_men.html', products=products_men)

@app.route('/product_catalog')
def product_catalog():
    return render_template('product_catalog.html', products=products)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/Cart')
def Cart():
    return render_template('Cart.html')

@app.route('/logout')
def logout():
    return render_template('logout.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/product/6')
def product_6_details():
    # ابحث عن المنتج الذي يحمل ID = 6
    product = next((p for p in products if p['id'] == 6), None)
    if not product:
        return "Product not found", 404
    return render_template('product.html', product=product_hoody)

if __name__ == '__main__':
    app.run(debug=True)
