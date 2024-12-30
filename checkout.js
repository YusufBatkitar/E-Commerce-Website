document.getElementById('checkout-form').addEventListener('submit', function(event) { 
    event.preventDefault();
    console.log('Form submit button clicked');

    // Kullanıcıdan alınan bilgileri kontrol edin
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

  
    if (address && cardNumber && expiry && cvv) {
    
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Your payment has been received. Thank you!';
        successMessage.style.display = 'block';

        setTimeout(() => {
            successMessage.style.display = 'none';
            window.location.href = "index.html";
        }, 3000);

        this.reset();
    } else {
        alert('Please fill in all fields!');
    }
});