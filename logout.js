document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            // Perform your logout logic here, e.g., clearing cookies or localStorage
            console.log('Logging out...'); // Replace with your actual logout logic

            // Example: If you're using localStorage/sessionStorage for login state:
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');

            // Redirect user to homepage after logout (or any other page)
            window.location.href = 'login.html'; // Modify this as needed
        });
    }
});
