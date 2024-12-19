document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Function to set theme based on time of day
    function setThemeBasedOnTime() {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 18) {
            body.classList.add('dark-mode');
            themeToggle.classList.replace('lucide-moon', 'lucide-sun');
        } else {
            body.classList.remove('light-mode');
            themeToggle.classList.replace('lucide-sun', 'lucide-moon');
        }
    }

    // Set initial theme
    setThemeBasedOnTime();

    // Toggle theme manually
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        themeToggle.classList.toggle('lucide-sun');
        themeToggle.classList.toggle('lucide-moon');
    });

    // Toggle search bar
    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('active');
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });

    // Sample product data with Unsplash images
    const products = [
        { 
            name: 'Futuristic T-Shirt', 
            price: 29.99, 
            image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'T-Shirts'
        },
        { 
            name: 'Cyber Jeans', 
            price: 59.99, 
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Jeans'
        },
        { 
            name: 'Neon Dress', 
            price: 79.99, 
            image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Dresses'
        },
        { 
            name: 'Holographic Jacket', 
            price: 99.99, 
            image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'Jackets'
        },
    ];

    // Function to render products
    function renderProducts() {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p class="product-category">${product.category}</p>
            `;
            productGrid.appendChild(productElement);
        });
    }

    // Render initial products
    renderProducts();

    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize Bootstrap carousel
    new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 5000,
        wrap: true,
        keyboard: true
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#easyECarousel");
    const progressBar = document.querySelector(".carousel-progress .progress-bar");
    const intervalTime = 3000; // Match the slide interval time
  
    const updateProgressBar = () => {
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.width = "100%";
      }, 10);
    };
  
    // Update progress bar on slide change
    carousel.addEventListener("slide.bs.carousel", updateProgressBar);
  
    // Initialize progress bar
    updateProgressBar();
  });
  
