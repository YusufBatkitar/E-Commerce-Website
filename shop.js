document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    const priceValue = document.getElementById("price-value");
    const productContainer = document.getElementById("product-container");
    const colorFilter = document.getElementById("color-filter"); 
    const cartData = [];
    const products = {
        women: [
            { id: 1, img: "img/ayakkabi.jpg", name: "Sneakers", price: 899.99, color: 'blue', category: 'men' },
            { id: 5, img: "img/nike.jpg", name: "Nike Sneakers", price: 3229.99, color: 'black', category: 'women' },
            { id: 12, img: "img/erkeksneaker2.jpg", name: "Skechers Sneakers", price: 2199.99, color: 'cream', category: 'men' },
            { id: 6, img: "img/nike2.jpg", name: "Men's Running Shoes", price: 2259.99, color: 'blue', category: 'women' },
            { id: 15, img: "img/erkeksneaker5.jpg", name: "Nike Sneaker", price: 3179.99, color: 'white', category: 'men' },
            { id: 7, img: "img/kadinsneaker2.jpg", name: "Skech Sneaker", price: 699.99, color: 'cream', category: 'women' },
            { id: 17, img: "img/erkeksneaker7.jpeg", name: "New Balance Men Sneaker", price: 519.99, color: 'white', category: 'men' },
            { id: 3, img: "img/kadinsneaker5.jpg", name: "NewBalance Sneaker", price: 3999.99, color: 'blue', category: 'women' },
            { id: 11, img: "img/kadinsneaker6.jpg", name: "Skechers Sneaker", price: 2199.99, color: 'black', category: 'women' }
        ],
        men: [
            { id: 2, img: "img/ayakkabi2.jpg", name: "Women's Boots", price: 699.99, color: 'white', category: 'women' },
            { id: 8, img: "img/erkeksneaker1.jpg", name: "Skechers Sneakers", price: 3229.99, color: 'black', category: 'men' },
            { id: 9, img: "img/kadinsneaker.jpg", name: "Derinet Sneakers", price: 1299.99, color: 'cream', category: 'women' },
            { id: 13, img: "img/erkeksneaker3.jpg", name: "Puma", price: 749.99, color: 'cream', category: 'men' },
            { id: 14, img: "img/erkeksneaker4.jpg", name: "Premiata Men's", price: 959.99, color: 'white', category: 'men' },
            { id: 4, img: "img/kadinsneaker3.jpg", name: "JohnMay Shoes", price: 2229.99, color: 'cream', category: 'women' },
            { id: 16, img: "img/erkeksneaker6.jpg", name: "Puma Men Sneaker", price: 2299.99, color: 'black', category: 'men' },
            { id: 10, img: "img/kadinsneaker4.jpg", name: "Purrai", price: 3149.99, color: 'white', category: 'women' }
        ]
    };

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showAddedToCartMessage(product);
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
                <p>${product.price.toFixed(2)} TL</p>
                <p>Color: ${product.color}</p>  <!-- Renk bilgisini burada ekliyoruz -->
                <button class="add-to-cart-btn">Add to Cart</button>
            `;

            const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
            addToCartBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(product);
            });

         
            productCard.addEventListener("click", () => {
                window.location.href = `product-detail.html?product_id=${product.id}`;
            });

            productContainer.appendChild(productCard);
        });
    }

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedColor = colorFilter.value;
        const searchQuery = searchInput.value.toLowerCase(); 

        let filteredProducts = [...products.women, ...products.men]; 

        
        if (selectedCategory !== "all") {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        if (selectedColor !== "all") {
            filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
        }
        if (searchQuery !== "") {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }
        if (priceFilter.value) {
            filteredProducts = filteredProducts.filter(product => product.price <= priceFilter.value);
        }

        renderProducts(filteredProducts);
    }

   
    categoryFilter.addEventListener("change", filterProducts);

    
    colorFilter.addEventListener("change", filterProducts);

   
    searchInput.addEventListener("input", filterProducts); 

   
    priceFilter.addEventListener("input", () => {
        priceValue.textContent = priceFilter.value;
        filterProducts(); 
    });
    renderProducts([...products.women, ...products.men]);

});
document.querySelector("a[href='#footer']").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#footer").scrollIntoView({
        behavior: "smooth"
    });
});

