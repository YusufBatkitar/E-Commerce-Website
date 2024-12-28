document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');

    const products = [
        { id: 1, img: "img/ayakkabi.jpg", name: "Sneakers", price: 899.99, description: "Great sneakers!" },
        { id: 2, img: "img/ayakkabi2.jpg", name: "Puma Women Sneaker", price: 699.99, description: "Comfortable and stylish." },
        { id: 3, img: "img/kadinsneaker5.jpg", name: "NewBalance Sneaker", price: 3999.99, description: "High-end sneakers." },
        { id: 4, img: "img/erkeksneaker3.jpg", name: "Puma Sneaker", price: 749.99, description: "Sporty and durable." },
        { id: 5, img: "img/nike.jpg", name: "Nike Sneakers", price: 3229.99, description: "Premium Nike sneakers." },
        { id: 6, img: "img/nike2.jpg", name: "Nike Woman Sneaker", price: 2259.99, description: "Elegant and stylish." },
        { id: 7, img: "img/kadinsneaker2.jpg", name: "Skech Sneaker", price: 699.99, description: "Comfortable and trendy." },
        { id: 8, img: "img/erkeksneaker1.jpg", name: "Skechers Sneakers", price: 3229.99, description: "Perfect for sports." },
        { id:9,  img: "img/kadinsneaker.jpg", name: "Derinet Sneakers", price: 1299.99 },
        { id:10, img: "img/kadinsneaker4.jpg", name: "Purrai", price: 3149.99 },
        { id:11, img: "img/kadinsneaker6.jpg", name: "Skechers Sneaker", price: 2199.99 },
        { id:12, img: "img/erkeksneaker2.jpg", name: "Skechers Sneakers", price: 2199.99 },
        { id:13, img: "img/erkeksneaker3.jpg", name: "Puma", price: 749.99 },
        { id:14, img: "img/erkeksneaker4.jpg", name: "Premiata Men's", price: 959.99 },
        { id:15, img: "img/erkeksneaker5.jpg", name: "Nike Sneaker", price: 3179.99 },
        { id:16, img: "img/erkeksneaker6.jpg", name: "Puma Men Sneaker", price: 2299.99 },
        { id:17, img: "img/erkeksneaker7.jpeg", name: "New Balance Men Sneaker", price: 519.99 }
    ];

   const product = products.find(p => p.id == productId);

   if (product) {
       // Ürün detaylarını sayfada göster
       document.getElementById("product-image").src = product.img;
       document.getElementById("product-name").textContent = product.name;
       document.getElementById("product-price").textContent = `${product.price} TL`;
       document.getElementById("product-description").textContent = product.description;

       // Sepete ekleme butonuna tıklanma olayı
       const addToCartBtn = document.getElementById("add-to-cart");
       addToCartBtn.addEventListener("click", () => {
           addToCart(product); 
           showAddedToCartMessage(product);
       });

       // Favorilere ekleme butonuna tıklanma olayı
       const addToFavoritesBtn = document.querySelector('.wishlist-btn');
       addToFavoritesBtn.addEventListener("click", () => {
           addToFavorites(product);
           showAddedToFavoritesMessage(product);
       });
   } else {
       alert("No product found!");
   }

   // Sepete ürün ekleme fonksiyonu
   function addToCart(product) {
       const cartData = JSON.parse(localStorage.getItem("cart")) || []; // LocalStorage'dan sepete veri al
       const existingProduct = cartData.find(item => item.name === product.name);

       if (existingProduct) {
           existingProduct.quantity += 1;
       } else {
           cartData.push({ ...product, quantity: 1 });
       }

       // Sepeti LocalStorage'a kaydet
       localStorage.setItem("cart", JSON.stringify(cartData));
   }

   // Sepete ürün eklendi mesajı
   function showAddedToCartMessage(product) {
       const message = document.getElementById("added-to-cart-message");
       message.textContent = `${product.name} added to cart`;
       message.style.display = "block"; 
       setTimeout(() => {
           message.style.display = "none";
       }, 3000);
   }

   // Favorilere ürün ekleme fonksiyonu
   function addToFavorites(product) {
       const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // LocalStorage'dan favorileri al
       const existingProduct = favorites.find(item => item.name === product.name);

       if (!existingProduct) {
           favorites.push(product); // Eğer ürün favorilerde yoksa, ekle
           localStorage.setItem("favorites", JSON.stringify(favorites)); // Favorileri kaydet
       }
   }

   // Favorilere ürün eklendi mesajı
   function showAddedToFavoritesMessage(product) {
       const message = document.createElement("div");
       message.textContent = `${product.name} has been added to favorites!`;
       message.style.position = "fixed";
       message.style.top = "80px";
       message.style.left = "50%";
       message.style.transform = "translateX(-50%)";
       message.style.backgroundColor = "#4caf50";
       message.style.color = "#fff";
       message.style.padding = "10px 20px";
       message.style.borderRadius = "5px";
       message.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
       document.body.appendChild(message);

       // Mesajı 3 saniye sonra kaldır
       setTimeout(() => {
           message.remove();
       }, 3000);
   }
   
    document.querySelector("a[href='#footer']").addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector("#footer").scrollIntoView({
            behavior: "smooth"
        });
    });
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = this.getAttribute('data-value');
            // Puanı localStorage veya backend'de saklayabilirsiniz
            console.log('Puan:', ratingValue);
            
            // Yıldızları işaretle
            this.parentNode.querySelectorAll('.star').forEach(star => {
                star.classList.remove('selected');
            });
            for (let i = 0; i < ratingValue; i++) {
                this.parentNode.children[i].classList.add('selected');
            }
        });
    });
});
