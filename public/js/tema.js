document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeSwitch');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
    });
});