document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeSwitch');
    const body = document.body;

    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('light-theme', savedTheme === 'light');
        themeToggle.checked = savedTheme === 'light'; 
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        const newTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        sessionStorage.setItem('theme', newTheme);
    });
});