// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Timeline animation on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -200px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Timeline Navigation System
class TimelineNavigator {
    constructor() {
        this.currentIndex = 0;
        // Define the main sections that correspond to progress dots
        this.sections = [
            document.querySelector('.hero'),
            document.querySelector('.section-title'),
            ...document.querySelectorAll('.timeline-item')
        ].filter(Boolean); // Remove any null elements
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.isScrolling = false;
        this.wheelTimeout = null;
        this.scrollTimeout = null;
        this.lastScrollTime = 0;
        this.wheelCooldown = 1000; // Cooldown period in ms
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateNavigation();
        this.updateProgressIndicator();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.navigateTo(this.currentIndex - 1));
        this.nextBtn.addEventListener('click', () => this.navigateTo(this.currentIndex + 1));
        
        // Progress dots
        this.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.navigateTo(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateTo(this.currentIndex - 1);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateTo(this.currentIndex + 1);
            }
        });
        
        // Scroll detection for updating current index
        window.addEventListener('scroll', () => {
            if (this.isScrolling) return;
            
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.updateCurrentIndex();
            }, 50);
        });
        
        // Wheel event for smooth navigation
    }
    
    navigateTo(index) {
        if (index < 0 || index >= this.sections.length) return;
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        this.currentIndex = index;
        
        const targetElement = this.sections[index];
        
        // Use different scroll behavior for hero section
        if (index === 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Add enhanced animation to the target item
        if (targetElement.classList.contains('timeline-item') || targetElement.classList.contains('section-title')) {
            targetElement.style.transform = 'scale(1.02)';
            setTimeout(() => {
                targetElement.style.transform = '';
            }, 300);
        }
        
        this.updateNavigation();
        this.updateProgressIndicator();
        
        // Reset scrolling flag
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }
    
    updateCurrentIndex() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        let newIndex = 0;
        
        // Special handling for hero section
        if (scrollY < viewportHeight * 0.5) {
            newIndex = 0;
        } else {
            // For other sections, find which one is most visible
            for (let i = 1; i < this.sections.length; i++) {
                const section = this.sections[i];
                if (!section) continue;
                
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                
                // Check if we've scrolled past the start of this section
                if (scrollY + viewportHeight * 0.4 >= sectionTop) {
                    newIndex = i;
                }
            }
        }
        
        // Only update if the index actually changed
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateNavigation();
            this.updateProgressIndicator();
        }
    }
    
    updateNavigation() {
        this.prevBtn.classList.toggle('disabled', this.currentIndex === 0);
        this.nextBtn.classList.toggle('disabled', this.currentIndex === this.sections.length - 1);
    }
    
    updateProgressIndicator() {
        this.progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Enhanced hover effects for timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            dot.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            dot.style.boxShadow = 'none';
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
        scrollIndicator.style.opacity = Math.max(0, 1 - scrolled / 300);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize timeline navigator
    window.timelineNavigator = new TimelineNavigator();
    
    // Initialize image switcher
    window.imageSwitcher = new ImageSwitcher();
    
    // Initialize translations
    if (window.translations) {
        window.translations.updateContent();
    }
});

// Language switching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (window.translations) {
                window.translations.switchLanguage(lang);
                
                // Add visual feedback to the clicked button
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Set initial active language button
    const currentLang = localStorage.getItem('language') || 'en';
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
});

// Enhanced timeline item animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Only animate if not already animated or if it's a fresh animation
            if (!entry.target.classList.contains('animate') && !entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to child elements
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    const elements = content.querySelectorAll('.timeline-image, .timeline-date, .timeline-title, .timeline-description');
                    elements.forEach((el, index) => {
                        el.style.animationDelay = `${index * 0.1}s`;
                        el.classList.add('fade-in-up');
                    });
                }
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Enhanced timeline observer that respects language switching
const enhancedTimelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            
            // Check if this item is in a language-switching state
            if (item.classList.contains('fade-out') || item.classList.contains('fade-in')) {
                return; // Don't interfere with language switching animations
            }
            
            // Only animate if not already animated
            if (!item.classList.contains('animate')) {
                item.classList.add('animate');
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all timeline items
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.timeline-item').forEach(item => {
        enhancedTimelineObserver.observe(item);
    });
});

// Image Switcher for Hero Section
class ImageSwitcher {
    constructor() {
        this.currentIndex = 0;
        this.totalImages = 4;
        this.profileImages = document.querySelector('.profile-images');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateIndicators();
        this.updateImagePositions();
    }
    
    setupEventListeners() {
        // Navigation arrows
        const leftArrow = document.querySelector('.nav-arrow.left');
        const rightArrow = document.querySelector('.nav-arrow.right');
        
        if (leftArrow) {
            leftArrow.addEventListener('click', () => this.previousImage());
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => this.nextImage());
        }
        
        // Click on indicator dots
        const switchDots = document.querySelectorAll('.switch-dot');
        switchDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(dot.dataset.index);
                this.goToImage(targetIndex);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only work when in hero section
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && window.scrollY < window.innerHeight * 0.7) {
                e.preventDefault();
                if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else {
                    this.nextImage();
                }
            }
        });
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateImagePositions();
        this.updateIndicators();
    }
    
    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateImagePositions();
        this.updateIndicators();
    }
    
    goToImage(index) {
        if (index >= 0 && index < this.totalImages) {
            this.currentIndex = index;
            this.updateImagePositions();
            this.updateIndicators();
        }
    }
    
    updateImagePositions() {
        this.profileImages.setAttribute('data-active', this.currentIndex);
    }
    
    updateIndicators() {
        const switchDots = document.querySelectorAll('.switch-dot');
        switchDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Add typing effect to the name (optional enhancement)
let currentTypewriterTimeout = null;

function typeWriter(element, text, speed = 100) {
    // Clear any existing typewriter animation
    if (currentTypewriterTimeout) {
        clearTimeout(currentTypewriterTimeout);
        currentTypewriterTimeout = null;
    }
    
    let i = 0;
    element.textContent = ''; // Use textContent for better performance
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            currentTypewriterTimeout = setTimeout(type, speed);
        } else {
            currentTypewriterTimeout = null;
        }
    }
    
    type();
}

// Make typeWriter function globally available
window.typeWriter = typeWriter;

window.addEventListener('load', () => {
     const nameElement = document.querySelector('.name');
     const originalText = nameElement.textContent;
     typeWriter(nameElement, originalText, 150);
});