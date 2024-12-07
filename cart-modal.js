document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart');
    const cancelCartBtn = document.getElementById('cancel-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    // Function to load and display cart items from localStorage
    function loadCartItems() {
        // Retrieve cart items from localStorage or initialize as an empty array if no items
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Update the cart count in the header
        cartCount.textContent = cart.length;

        // Clear previous cart items in the modal
        cartItemsContainer.innerHTML = '';

        // Calculate the total price of the cart
        let totalPrice = 0;

        // Display each cart item in the modal
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            // Add the delete item functionality
            const deleteBtn = cartItemDiv.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                removeCartItem(index); // Remove item from the cart
            });

            // Update the total price
            totalPrice += item.price;
        });

        // Update the total price display
        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Function to remove an item from the cart
    function removeCartItem(index) {
        // Retrieve the current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Remove the item at the specified index
        cart.splice(index, 1);

        // Save the updated cart back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));

        // Reload the cart items
        loadCartItems();
    }

    // Open the cart modal when the cart icon is clicked
    document.getElementById('cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'block'; // Show the modal
        loadCartItems(); // Load and display the current cart items
    });

    // Close the cart modal when the close button is clicked
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none'; // Hide the modal
    });

    // Close the cart modal when the cancel button is clicked
    cancelCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none'; // Hide the modal
    });

    // Initialize the modal by loading cart items when the page is loaded
    loadCartItems();
});
