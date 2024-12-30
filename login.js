document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form'); 
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        
        const users = JSON.parse(localStorage.getItem('users')) || [];

       
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedIn', 'true'); 
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('fromLogin', 'true'); 
            window.location.href = 'index.html';  
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});

