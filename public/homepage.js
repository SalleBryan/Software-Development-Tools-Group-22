document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
  
    // Fetch and display products
    function fetchProducts() {
      fetch('/api/products')
        .then(response => response.json())
        .then(products => {
          productList.innerHTML = ''; // Clear existing products
          products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
              <h3>${product.name}</h3>
              <img src="${product.image_url}" alt="${product.name}" />
            `;
            productList.appendChild(productItem);
          });
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  
    // Initial fetch
    fetchProducts();
  });

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
   
  
