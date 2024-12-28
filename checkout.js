document.getElementById('checkout-form').addEventListener('submit', function(event) { 
    event.preventDefault(); // Formun varsayılan davranışını engelle
    console.log('Form submit button clicked'); // Formun gönderilme olayını kontrol etmek için

    // Kullanıcıdan alınan bilgileri kontrol edin
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Basit bir doğrulama
    if (address && cardNumber && expiry && cvv) {
        // Başarı mesajını göster
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Your payment has been received. Thank you!';
        successMessage.style.display = 'block';

        // 3 saniye sonra mesajı gizle ve ana sayfaya yönlendir
        setTimeout(() => {
            successMessage.style.display = 'none';
            window.location.href = "index.html"; // Ana sayfaya yönlendirme
        }, 3000);

        // Formu sıfırla
        this.reset();
    } else {
        // Eksik bilgi uyarısı
        alert('Please fill in all fields!');
    }
});
