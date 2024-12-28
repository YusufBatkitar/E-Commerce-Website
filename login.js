document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form'); 
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Mevcut kullanıcıları getir
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kullanıcı bilgilerini kontrol et
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Kullanıcı doğrulandı
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('user', JSON.stringify(user)); 

            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
