document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/login', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    if (data.success) {
        alert('Login successful!');
        window.location.href = '/';
    } else {
        alert(data.error || 'Invalid credentials');
    }
});

document.getElementById('signupForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/signup', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    if (data.success) {
        alert(data.message);
        window.location.href = '/login';
    } else {
        alert(data.error);
    }
});
