document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('h1');
    const hours = new Date().getHours();

    if (hours < 12) {
        welcomeMessage.textContent = 'Good Morning! Welcome to Girls and Sons Dress Shop';
    } else if (hours < 18) {
        welcomeMessage.textContent = 'Good Afternoon! Welcome to Girls and Sons Dress Shop';
    } else {
        welcomeMessage.textContent = 'Good Evening! Welcome to Girls and Sons Dress Shop';
    }
});




