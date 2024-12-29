document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    const priceValue = document.getElementById("price-value");
    const productContainer = document.getElementById("product-container");


    const cartData = [];
    const products = {
        women: [
            { id: 2, img: "img/ayakkabi2.jpg", name: "Women's Boots", price: 699.99 },
            { id: 5, img: "img/nike.jpg", name: "Nike Sneakers", price: 3229.99 },
            { id: 6, img: "img/nike2.jpg", name: "Men's Running Shoes", price: 2259.99 },
            { id: 9, img: "img/kadinsneaker.jpg", name: "Derinet Sneakers", price: 1299.99 },
            { id: 7, img: "img/kadinsneaker2.jpg", name: "Skech Sneaker", price: 699.99 },
            { id: 4, img: "img/kadinsneaker3.jpg", name: "JohnMay Shoes", price: 2229.99 },
            { id: 10, img: "img/kadinsneaker4.jpg", name: "Purrai", price: 3149.99 },
            { id: 3, img: "img/kadinsneaker5.jpg", name: "NewBalance Sneaker", price: 3999.99 },
            { id: 11, img: "img/kadinsneaker6.jpg", name: "Skechers Sneaker", price: 2199.99 }
        ],
        men: [
            { id: 1, img: "img/ayakkabi.jpg", name: "Sneakers", price: 899.99 },
            { id: 8, img: "img/erkeksneaker1.jpg", name: "Skechers Sneakers", price: 3229.99 },
            { id: 12, img: "img/erkeksneaker2.jpg", name: "Skechers Sneakers", price: 2199.99 },
            { id: 13, img: "img/erkeksneaker3.jpg", name: "Puma", price: 749.99 },
            { id: 14, img: "img/erkeksneaker4.jpg", name: "Premiata Men's", price: 959.99 },
            { id: 15, img: "img/erkeksneaker5.jpg", name: "Nike Sneaker", price: 3179.99 },
            { id: 16, img: "img/erkeksneaker6.jpg", name: "Puma Men Sneaker", price: 2299.99 },
            { id: 17, img: "img/erkeksneaker7.jpeg", name: "New Balance Men Sneaker", price: 519.99 }
        ]
    };

    // Sepete ürün ekleme fonksiyonu
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

    // Sepete eklenen ürün mesajını gösterme
    function showAddedToCartMessage(product) {
        const message = document.getElementById("added-to-cart-message");
        message.textContent = `${product.name} added to cart!`;
        message.style.display = "block"; 
        setTimeout(() => {
            message.style.display = "none";
        }, 3000);
    }

    // Ürünleri render etme
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
                <button class="add-to-cart-btn">Add to Cart</button>
            `;

            // Sepete ekle butonuna tıklama olayını ekliyoruz
            const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
            addToCartBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(product);
            });

            // Ürün kartına tıklama olayını ekliyoruz
            productCard.addEventListener("click", () => {
                window.location.href = `product-detail.html?product_id=${product.id}`;
            });

            productContainer.appendChild(productCard);
        });
    }

    // Kategori seçildiğinde ürünleri filtrele
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        let filteredProducts = [];
        if (selectedCategory === "women") {
            filteredProducts = products.women;
        } else if (selectedCategory === "men") {
            filteredProducts = products.men;
        } else {
            filteredProducts = [...products.women, ...products.men];
        }
        renderProducts(filteredProducts);
    });

    // Arama işlevi
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredProducts = [...products.women, ...products.men].filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
        renderProducts(filteredProducts);
    });

    // Fiyat filtresi
    priceFilter.addEventListener("input", () => {
        priceValue.textContent = priceFilter.value;
        const filteredProducts = [...products.women, ...products.men].filter(product =>
            product.price <= priceFilter.value
        );
        renderProducts(filteredProducts);
    });

    // Başlangıçta tüm ürünleri göster
    renderProducts([...products.women, ...products.men]);
});
document.querySelector("a[href='#footer']").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#footer").scrollIntoView({
        behavior: "smooth"
    });
});