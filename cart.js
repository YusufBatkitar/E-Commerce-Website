document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTable = document.getElementById("cart-table");
    const cartSummary = document.getElementById("cart-summary");
    const addedToCartMessage = document.getElementById("added-to-cart-message");

    // Sepeti LocalStorage'dan yükleme
    function loadCartData() {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    }

  
    let cartData = loadCartData();

 
    function renderCart() {
        if (cartData.length === 0) {
            emptyCartMessage.style.display = "block";
            cartTable.style.display = "none";
            cartSummary.style.display = "none";
            return;
        }

        emptyCartMessage.style.display = "none";
        cartTable.style.display = "table";
        cartSummary.style.display = "block";

        cartItemsContainer.innerHTML = ""; 
        let totalPrice = 0;

        cartData.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price} TL</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
                </td>
                <td>${itemTotal.toFixed(2)} TL</td>
                <td>
                    <button class="btn remove-btn" data-index="${index}">Remove</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.textContent = `${totalPrice.toFixed(2)} TL`;
    }

 
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
        addedToCartMessage.textContent = message;
        addedToCartMessage.style.display = "block";
        setTimeout(() => {
            addedToCartMessage.style.display = "none";
        }, 3000);
    }

    // Remove butonunun tıklama olayı
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.dataset.index;
            removeItem(index);
        }
    });
    function removeItem(index) {
        // Eğer ürün miktarı 1'den fazla ise miktarı bir azalt
        if (cartData[index].quantity > 1) {
            cartData[index].quantity -= 1;
        } else {
            // Eğer miktar 1 ise, ürünü tamamen sepetten çıkar
            cartData.splice(index, 1);
        }
    
        // Sepeti localStorage'a kaydet
        localStorage.setItem("cart", JSON.stringify(cartData)); 
        
        // Sepeti yeniden render et
        renderCart();
    }
    


    renderCart();
});
document.querySelector("a[href='#footer']").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#footer").scrollIntoView({
        behavior: "smooth"
    });
});

