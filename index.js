const themeToggle = document.getElementById('theme-toggle');
const icon = document.getElementById('icon');
const body = document.body;

// Check localStorage for theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode'); // Apply dark mode
        icon.classList.replace('fa-sun', 'fa-moon'); // Set moon icon
    }
});

// Toggle theme and save preference to localStorage
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode'); // Remove dark mode
        icon.classList.replace('fa-moon', 'fa-sun'); // Switch to sun icon
        localStorage.setItem('theme', 'light'); // Save theme preference as light
    } else {
        body.classList.add('dark-mode'); // Apply dark mode
        icon.classList.replace('fa-sun', 'fa-moon'); // Switch to moon icon
        localStorage.setItem('theme', 'dark'); // Save theme preference as dark
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const cartCount = document.getElementById('cart-count');
    const totalPriceEl = document.getElementById('total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    // Open Cart Modal
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCart();
    });

    // Close Cart Modal
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Get product details
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);
            const image = button.dataset.image;

            // Add product to cart (Allow duplicates for different products)
            cart.push({ id, name, price, quantity: 1, image });

            updateCart();
        });
    });

    // Update Cart
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear existing cart items
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // Create cart item details
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-actions">
                        <button class="decrement" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increment" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div>Rs. ${item.price * item.quantity}</div>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        // Update total price and cart count
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        totalPriceEl.textContent = total;

        // Increment/Decrement functionality
        document.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                const item = cart.find(product => product.id === id);
                if (item) item.quantity++;
                updateCart();
            });
        });

        document.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                const item = cart.find(product => product.id === id);
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(product => product.id !== id);
                }
                updateCart();
            });
        });
    }

    // Buy Now Functionality
    buyNowBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        alert('Purchase successful!');
        cart = []; // Clear cart after purchase
        updateCart();
        cartModal.style.display = 'none';
    });
});


