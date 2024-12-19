document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const cartCount = document.getElementById('cart-count');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = [];
    const products = [
        // Electronics (15 items)
        { id: 1, name: 'Smartphone', price: 499.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1160&q=80' },
        { id: 2, name: 'Laptop', price: 999.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1171&q=80' },
        { id: 3, name: 'Smartwatch', price: 199.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=764&q=80' },
        { id: 4, name: 'Wireless Earbuds', price: 129.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1590658485404-54a56679c383?auto=format&fit=crop&w=1170&q=80' },
        { id: 5, name: 'Digital Camera', price: 449.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=764&q=80' },
        { id: 6, name: 'Tablet', price: 299.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1170&q=80' },
        { id: 7, name: 'Bluetooth Speaker', price: 99.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1550565105-7c1fd21e63b8?auto=format&fit=crop&w=1170&q=80' },
        { id: 8, name: 'Desktop Computer', price: 899.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1171&q=80' },
        { id: 9, name: 'Drone', price: 599.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1505028106030-e7dad34f3ede?auto=format&fit=crop&w=1170&q=80' },
        { id: 10, name: 'E-Reader', price: 129.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=687&q=80' },
        { id: 11, name: 'Gaming Console', price: 499.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1622515040584-4a2f5b62e6f6?auto=format&fit=crop&w=687&q=80' },
        { id: 12, name: 'Monitor', price: 299.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1171&q=80' },
        { id: 13, name: 'Printer', price: 149.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1527427335005-63d92ad78878?auto=format&fit=crop&w=1170&q=80' },
        { id: 14, name: 'Router', price: 89.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1615667251635-5bcf68c49e6c?auto=format&fit=crop&w=1170&q=80' },
        { id: 15, name: 'VR Headset', price: 399.99, category: 'electronics', image: 'https://images.unsplash.com/photo-1611151860221-e2a26c89b71d?auto=format&fit=crop&w=764&q=80' },

        // Clothing (15 items)
        { id: 16, name: 'T-shirt', price: 19.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1160&q=80' },
        { id: 17, name: 'Jeans', price: 49.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=1026&q=80' },
        { id: 18, name: 'Hoodie', price: 39.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=687&q=80' },
        { id: 19, name: 'Dress', price: 59.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=687&q=80' },
        { id: 20, name: 'Sneakers', price: 79.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1112&q=80' },
        { id: 21, name: 'Blazer', price: 99.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1562184557-804934d3dbbe?auto=format&fit=crop&w=1170&q=80' },
        { id: 22, name: 'Sweater', price: 49.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1549472215-e017f6fa56c2?auto=format&fit=crop&w=1170&q=80' },
        { id: 23, name: 'Jacket', price: 129.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1517576933289-b520bc67d4ad?auto=format&fit=crop&w=1000&q=80' },
        { id: 24, name: 'Scarf', price: 19.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1516802273407-8d4e13a64f4f?auto=format&fit=crop&w=1170&q=80' },
        { id: 25, name: 'Cap', price: 14.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1533884978-564d11d26ff5?auto=format&fit=crop&w=1150&q=80' },
        { id: 26, name: 'Watch', price: 79.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1566411297-b8b70f63a2ed?auto=format&fit=crop&w=1170&q=80' },
        { id: 27, name: 'Gloves', price: 29.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1583095094657-d24a4d8b3a97?auto=format&fit=crop&w=900&q=80' },
        { id: 28, name: 'Boots', price: 99.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1584021612017-bb5b92502462?auto=format&fit=crop&w=1000&q=80' },
        { id: 29, name: 'Socks', price: 9.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1591467847575-b04a6fffcf2d?auto=format&fit=crop&w=999&q=80' },
        { id: 30, name: 'Shorts', price: 34.99, category: 'clothing', image: 'https://images.unsplash.com/photo-1516677779999-6498267501c5?auto=format&fit=crop&w=1000&q=80' },

        // Home & Garden (15 items)
        { id: 31, name: 'Plant Pot', price: 24.99, category: 'home', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1172&q=80' },
        { id: 32, name: 'Desk Lamp', price: 34.99, category: 'home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=687&q=80' },
        { id: 33, name: 'Throw Pillow', price: 19.99, category: 'home', image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=687&q=80' },
        { id: 34, name: 'Wall Clock', price: 29.99, category: 'home', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=870&q=80' },
        { id: 35, name: 'Artificial Plant', price: 15.99, category: 'home', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1172&q=80' },
        { id: 36, name: 'Wall Art', price: 45.99, category: 'home', image: 'https://images.unsplash.com/photo-1565069988-c88e4eb3f58f?auto=format&fit=crop&w=800&q=80' },
        { id: 37, name: 'Outdoor Furniture', price: 150.99, category: 'home', image: 'https://images.unsplash.com/photo-1508095430302-bd44e04b8b57?auto=format&fit=crop&w=700&q=80' },
        { id: 38, name: 'Rug', price: 49.99, category: 'home', image: 'https://images.unsplash.com/photo-1533077346734-bb08f94a0eae?auto=format&fit=crop&w=640&q=80' },
        { id: 39, name: 'Coffee Table', price: 120.99, category: 'home', image: 'https://images.unsplash.com/photo-1609137632527-476ccafc65c1?auto=format&fit=crop&w=800&q=80' },
        { id: 40, name: 'Bookshelf', price: 79.99, category: 'home', image: 'https://images.unsplash.com/photo-1517220300348-88b3d66b9b74?auto=format&fit=crop&w=500&q=80' },
        { id: 41, name: 'Curtains', price: 24.99, category: 'home', image: 'https://images.unsplash.com/photo-1579137677791-ec34e81ec0a9?auto=format&fit=crop&w=800&q=80' },
        { id: 42, name: 'Dining Set', price: 220.99, category: 'home', image: 'https://images.unsplash.com/photo-1524077503802-c2cb01dfe9ba?auto=format&fit=crop&w=800&q=80' },
        { id: 43, name: 'Shelves', price: 89.99, category: 'home', image: 'https://images.unsplash.com/photo-1520571230351-4a775b0a8ad1?auto=format&fit=crop&w=800&q=80' },
        { id: 44, name: 'Planters', price: 18.99, category: 'home', image: 'https://images.unsplash.com/photo-1586288043940-d694215b7da5?auto=format&fit=crop&w=800&q=80' },
        { id: 45, name: 'Umbrella Stand', price: 29.99, category: 'home', image: 'https://images.unsplash.com/photo-1589981792464-c3d8a0563899?auto=format&fit=crop&w=700&q=80' },

        // Books (15 items)
        { id: 46, name: 'Novel', price: 12.99, category: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=687&q=80' },
        { id: 47, name: 'Cookbook', price: 24.99, category: 'books', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1176&q=80' },
        { id: 48, name: 'Self-Help Book', price: 15.99, category: 'books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1074&q=80' },
        { id: 49, name: 'Children\'s Book', price: 9.99, category: 'books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1170&q=80' },
        { id: 50, name: 'Biography', price: 19.99, category: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=687&q=80' },
        { id: 51, name: 'Fantasy Novel', price: 14.99, category: 'books', image: 'https://images.unsplash.com/photo-1571581382465-2b0c6cc0a3e1?auto=format&fit=crop&w=750&q=80' },
        { id: 52, name: 'Horror Novel', price: 18.99, category: 'books', image: 'https://images.unsplash.com/photo-1605923510153-674e7f9b7108?auto=format&fit=crop&w=700&q=80' },
        { id: 53, name: 'Biography of Steve Jobs', price: 22.99, category: 'books', image: 'https://images.unsplash.com/photo-1555482021-70f36cf4c85b?auto=format&fit=crop&w=687&q=80' },
        { id: 54, name: 'Philosophy', price: 21.99, category: 'books', image: 'https://images.unsplash.com/photo-1572590193020-ecbbf6f9f5a0?auto=format&fit=crop&w=1176&q=80' },
        { id: 55, name: 'Motivational Book', price: 13.99, category: 'books', image: 'https://images.unsplash.com/photo-1537439286589-dac1c7a2ef4c?auto=format&fit=crop&w=800&q=80' },
        { id: 56, name: 'Poetry', price: 12.99, category: 'books', image: 'https://images.unsplash.com/photo-1561737398-801eecf5e857?auto=format&fit=crop&w=700&q=80' },
        { id: 57, name: 'Art Book', price: 29.99, category: 'books', image: 'https://images.unsplash.com/photo-1520500882680-f5d55ac6b04f?auto=format&fit=crop&w=687&q=80' },
        { id: 58, name: 'Cooking Recipe Book', price: 24.99, category: 'books', image: 'https://images.unsplash.com/photo-1541553643-0d8e5abcc990?auto=format&fit=crop&w=1176&q=80' },
        { id: 59, name: 'Science Book', price: 18.99, category: 'books', image: 'https://images.unsplash.com/photo-1561948952-b0d15c5d5bfe?auto=format&fit=crop&w=750&q=80' },
        { id: 60, name: 'Mathematics Book', price: 17.99, category: 'books', image: 'https://images.unsplash.com/photo-1549428034-2f6e2e1be29b?auto=format&fit=crop&w=750&q=80' },

        // Sports (15 items)
        { id: 61, name: 'Yoga Mat', price: 29.99, category: 'sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=880&q=80' },
        { id: 62, name: 'Dumbbells', price: 39.99, category: 'sports', image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=687&q=80' },
        { id: 63, name: 'Tennis Racket', price: 59.99, category: 'sports', image: 'https://images.unsplash.com/photo-1622279457486-62d132ddc573?auto=format&fit=crop&w=1170&q=80' },
        { id: 64, name: 'Basketball', price: 24.99, category: 'sports', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1171&q=80' },
        { id: 65, name: 'Hiking Backpack', price: 79.99, category: 'sports', image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=688&q=80' },
        { id: 66, name: 'Football', price: 39.99, category: 'sports', image: 'https://images.unsplash.com/photo-1554522477-e4d2456b4eb5?auto=format&fit=crop&w=750&q=80' },
        { id: 67, name: 'Baseball Glove', price: 29.99, category: 'sports', image: 'https://images.unsplash.com/photo-1582610615284-b9edfa6d01fd?auto=format&fit=crop&w=758&q=80' },
        { id: 68, name: 'Badminton Racket', price: 19.99, category: 'sports', image: 'https://images.unsplash.com/photo-1592290381181-4d45e50bc77a?auto=format&fit=crop&w=750&q=80' },
        { id: 69, name: 'Running Shoes', price: 79.99, category: 'sports', image: 'https://images.unsplash.com/photo-1571201361025-38a4d1b599ad?auto=format&fit=crop&w=1200&q=80' },
        { id: 70, name: 'Tennis Ball', price: 9.99, category: 'sports', image: 'https://images.unsplash.com/photo-1571235243992-9d8c42454447?auto=format&fit=crop&w=750&q=80' },
        { id: 71, name: 'Cycling Helmet', price: 49.99, category: 'sports', image: 'https://images.unsplash.com/photo-1564018362-bdfcedb6805a?auto=format&fit=crop&w=800&q=80' },
        { id: 72, name: 'Golf Club', price: 129.99, category: 'sports', image: 'https://images.unsplash.com/photo-1535516360-b7d18a1e4b76?auto=format&fit=crop&w=1150&q=80' },
        { id: 73, name: 'Jump Rope', price: 15.99, category: 'sports', image: 'https://images.unsplash.com/photo-1617134123573-07b6942e3be7?auto=format&fit=crop&w=688&q=80' },
        { id: 74, name: 'Climbing Harness', price: 89.99, category: 'sports', image: 'https://images.unsplash.com/photo-1560329790-f062efbca4fe?auto=format&fit=crop&w=750&q=80' },

        // Beauty (15 items)
        { id: 75, name: 'Face Cream', price: 22.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=687&q=80' },
        { id: 76, name: 'Shampoo', price: 9.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=695&q=80' },
        { id: 77, name: 'Lipstick', price: 14.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=715&q=80' },
        { id: 78, name: 'Perfume', price: 49.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=704&q=80' },
        { id: 79, name: 'Nail Polish', price: 7.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1521837670401-2bd439d481c5?auto=format&fit=crop&w=1170&q=80' },
        { id: 80, name: 'Face Mask', price: 19.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1600427452787-7780292a5278?auto=format&fit=crop&w=700&q=80' },
        { id: 81, name: 'Eye Liner', price: 9.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1565687944-07f90bc9cf68?auto=format&fit=crop&w=900&q=80' },
        { id: 82, name: 'Moisturizer', price: 25.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1592060613344-bd26f93b5223?auto=format&fit=crop&w=768&q=80' },
        { id: 83, name: 'Sunscreen', price: 15.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1602783618672-d53bb7b8d1fc?auto=format&fit=crop&w=1150&q=80' },
        { id: 84, name: 'Blush', price: 11.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1587743152369-7c833eb59db0?auto=format&fit=crop&w=775&q=80' },
        { id: 85, name: 'Makeup Remover', price: 12.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1580524960667-0a92616eac23?auto=format&fit=crop&w=750&q=80' },
        { id: 86, name: 'Hair Serum', price: 19.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1532336902435-67d72a43f84f?auto=format&fit=crop&w=780&q=80' },
        { id: 87, name: 'Shaving Cream', price: 9.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1590421384675-c0d99057a4b5?auto=format&fit=crop&w=750&q=80' },
        { id: 88, name: 'Hairbrush', price: 14.99, category: 'beauty', image: 'https://images.unsplash.com/photo-1578327152725-28c54075ec60?auto=format&fit=crop&w=750&q=80' },
    ];


    function displayProducts(category = 'all') {
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        productsContainer.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
        addToCartListeners();
    }

    function addToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            showNotification(`${product.name} added to cart!`);
            updateCartItems();
        }
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }
    

    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function updateCartItems() {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
        `).join('');
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        productsContainer.innerHTML = filtered.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
        addToCartListeners();
    });

    categoryButtons.forEach(btn => btn.addEventListener('click', () => displayProducts(btn.dataset.category)));

    displayProducts();
});
