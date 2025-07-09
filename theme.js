// Theme management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update theme toggle button
        this.updateThemeButton();
        
        // Add event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeButton();
    }
    
    updateThemeButton() {
        const themeToggle = document.querySelector('.theme-toggle');
        const icon = themeToggle?.querySelector('.theme-icon');
        
        if (icon) {
            icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Initialize theme manager
window.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});