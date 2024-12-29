document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engelle

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basit doğrulama
    if (name && email && message) {
        const contactMessage = { name, email, message };
        console.log('Mesaj Kaydedildi:', contactMessage);

        // Başarı mesajını göster
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Your message has been sent successfully!';
        successMessage.classList.remove('hidden'); // Mesajı görünür yap

        // Form alanlarını sıfırla
        document.getElementById('contact-form').reset();

        // 3 saniye sonra başarı mesajını gizle
        setTimeout(() => {
            successMessage.classList.add('hidden'); // Mesajı tekrar gizle
        }, 3000);
    } else {
        alert('Please fill in all fields!');
    }
});
