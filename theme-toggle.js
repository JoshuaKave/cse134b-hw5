(function() {
    const THEME_KEY = 'portfolio-theme';
    const DARK_MODE = 'night-mode';
    document.documentElement.classList.add('js-enabled');
    const themeToggle = document.getElementsByClassName('theme-toggle')[0];

    if (!themeToggle) return;

    const currentTheme = localStorage.getItem(THEME_KEY);

    if (currentTheme === DARK_MODE) {
        document.documentElement.classList.add(DARK_MODE);
        themeToggle.textContent = 'Day';
    }

    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle(DARK_MODE);
        
        if (document.documentElement.classList.contains(DARK_MODE)) {
            localStorage.setItem(THEME_KEY, DARK_MODE);
            themeToggle.textContent = 'Day';
        } else {
            localStorage.removeItem(THEME_KEY);
            themeToggle.textContent = 'Night';
        }
    });
})();