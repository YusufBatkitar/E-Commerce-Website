document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        // Mevcut kullanıcıları getir veya boş bir liste oluştur
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kullanıcıyı listeye ekle
        users.push({ username, email, password });

        // Güncellenmiş listeyi kaydet
        localStorage.setItem('users', JSON.stringify(users));

    
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Your registration has been completed successfully!';
        successMessage.style.position = 'fixed';
        successMessage.style.top = '20px';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translateX(-50%)';
        successMessage.style.backgroundColor = '#4caf50';
        successMessage.style.color = '#fff';
        successMessage.style.padding = '10px 20px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
            window.location.href = 'login.html'; 
        }, 2000);
    } else {
        alert('Please fill in all the fields!');
    }
});