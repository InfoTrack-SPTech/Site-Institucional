document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    if (logoutButton && logoutModal && confirmLogout && cancelLogout) {
        logoutButton.addEventListener('click', function() {
            logoutModal.style.display = 'flex';
        });

        confirmLogout.addEventListener('click', function() {
            sessionStorage.clear(); 

            window.location.href = './index.html';

            history.replaceState(null, '', './index.html');
        });

        cancelLogout.addEventListener('click', function() {
            logoutModal.style.display = 'none';
        });
    } else {
        console.error("One or more elements not found.");
    }
});