document.addEventListener("DOMContentLoaded", () => {
    const categoryBtns = document.querySelectorAll(".category-btn");
    const productContainer = document.getElementById("product-container");

    const products = {
        new: [
            { id: 1, img: "img/ayakkabi.jpg", name: "Sneakers", price: 899.99, category: "new" },
            { id: 2, img: "img/ayakkabi2.jpg", name: "Puma Women Sneaker", price: 699.99, category: "new" },
            { id: 3, img: "img/kadinsneaker5.jpg", name: "NewBalance Sneaker", price: 3999.99, category: "new" },
            { id: 4, img: "img/erkeksneaker3.jpg", name: "Puma Sneaker", price: 749.99, category: "new" }
        ],
        discounted: [
            { id: 5, img: "img/nike.jpg", name: "Nike Sneakers", price: 3229.99, category: "discounted" },
            { id: 6, img: "img/nike2.jpg", name: "Nike Woman Sneaker", price: 2259.99, category: "discounted" },
            { id: 7, img: "img/kadinsneaker2.jpg", name: "Skech Sneaker", price: 699.99, category: "discounted" },
            { id: 8, img: "img/erkeksneaker1.jpg", name: "Skechers Sneakers", price: 3229.99, category: "discounted" }
        ],
        special: [  
            {id:15, img: "img/erkeksneaker5.jpg", name: "Nike Sneaker", price: 3179.99, category: "special" },
            {id:13, img: "img/erkeksneaker3.jpg", name: "Puma", price: 749.99, category: "special" },
            {id:17, img: "img/erkeksneaker7.jpeg", name: "New Balance Men Sneaker", price: 519.99, category: "special" },
            { id:10, img: "img/kadinsneaker4.jpg", name: "Purrai", price: 3149.99, category: "special" }
        ]
    };

    function addToCart(product) {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cartData.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartData.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cartData));
    }

    function showAddedToCartMessage(product) {
        const message = document.getElementById("added-to-cart-message");
        message.textContent = `${product.name} added to cart!`;
        message.style.display = "block"; 
        setTimeout(() => {
            message.style.display = "none"; 
        }, 3000);
    }

    function renderProducts(productsToRender) {
        productContainer.innerHTML = ""; 
        productsToRender.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.setAttribute("data-product-id", product.id);

            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} TL</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;

            const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
            addToCartBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                addToCart(product);
                showAddedToCartMessage(product); 
            });

            productCard.addEventListener("click", () => {
                window.location.href = `product-detail.html?product_id=${product.id}`;
            });

            productContainer.appendChild(productCard);
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-category");
            renderProducts(products[category]);
        });
    });
    document.getElementById('contact-us-btn').addEventListener('click', function() {
        window.location.href = 'contact.html';
    });

    renderProducts(products.discounted);

    function checkLoginStatus() {
        const loggedIn = localStorage.getItem("loggedIn");
        const loginBtn = document.querySelector(".auth-buttons .btn[href='login.html']");
        const signupBtn = document.querySelector(".auth-buttons .btn[href='register.html']");
        const logoutBtn = document.getElementById("logout-btn");
        const greetingMessage = document.getElementById("greeting-message");
        const usernameSpan = document.getElementById("username");

        if (loggedIn === "true") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            usernameSpan.textContent = storedUser.username;
            loginBtn.style.display = "none";
            signupBtn.style.display = "none";
            logoutBtn.style.display = "inline-block"; 

            const specialButtonContainer = document.getElementById("special-button-container");
            const specialButton = document.createElement("button");
            specialButton.classList.add("category-btn");
            specialButton.textContent = `${storedUser.username}, our special products for you`;
            specialButton.addEventListener("click", () => {
                categoryBtns.forEach(b => b.classList.remove("active"));
                specialButton.classList.add("active");
                renderProducts(products.special); 
            });
            specialButtonContainer.appendChild(specialButton);

            setTimeout(() => {
                greetingMessage.style.display = "none";
            }, 3000);
        } else { 
            loginBtn.style.display = "inline-block";
            signupBtn.style.display = "inline-block";
            logoutBtn.style.display = "none"; 
        }
    }

    
    checkLoginStatus();

   
    const fromLogin = localStorage.getItem("fromLogin");
    const greetingMessage = document.getElementById("greeting-message");

    if (fromLogin === "true") {
        greetingMessage.style.display = "block";
        localStorage.removeItem("fromLogin");
        setTimeout(() => {
            greetingMessage.style.display = "none"; 
        }, 3000);
    }

   
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user"); 
        window.location.href = "index.html"; 
    });

u
    document.getElementById('contact-us-btn').addEventListener('click', function() {
        window.location.href = 'contact.html';     
    });
});
document.querySelector("a[href='#footer']").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#footer").scrollIntoView({
        behavior: "smooth"
    });
    
});

