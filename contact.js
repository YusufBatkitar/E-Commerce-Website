document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    
    if (name && email && message) {
        const contactMessage = { name, email, message };
        console.log('Mesaj Kaydedildi:', contactMessage);

       
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Your message has been sent successfully!';
        successMessage.classList.remove('hidden'); 

       
        document.getElementById('contact-form').reset();

        
        setTimeout(() => {
            successMessage.classList.add('hidden'); 
        }, 3000);
    } else {
        alert('Please fill in all fields!');
    }
});
