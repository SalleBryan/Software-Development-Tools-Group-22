document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('You have been logged out successfully.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});

