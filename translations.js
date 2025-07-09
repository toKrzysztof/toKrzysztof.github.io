// Translation data
const translations = {
    en: {
        // Hero section
        name: "Your Name",
        title: "Full Stack Developer & Designer",
        summary: "Passionate developer with 5+ years of experience creating innovative digital solutions. I specialize in modern web technologies and love turning complex problems into simple, beautiful designs. Always eager to learn new technologies and collaborate on exciting projects.",
        getInTouch: "Get In Touch",
        viewJourney: "View My Journey",
        
        // Timeline section
        myJourney: "My Journey",
        
        // Timeline items
        timeline: {
            2019: {
                title: "Computer Science Degree",
                description: "Graduated with honors from University with a Bachelor's in Computer Science. Specialized in software engineering and web development, building a strong foundation in algorithms, data structures, and modern programming paradigms."
            },
            2020: {
                title: "Junior Developer at TechCorp",
                description: "Started my professional journey as a Junior Developer, working on React applications and learning industry best practices. Collaborated with senior developers on multiple client projects and gained valuable experience in agile development methodologies."
            },
            2022: {
                title: "Full Stack Developer",
                description: "Promoted to Full Stack Developer role, taking on more complex projects involving Node.js, databases, and cloud deployment. Led a team of 3 developers on a major e-commerce platform that increased client revenue by 40%."
            },
            2023: {
                title: "Freelance Consultant",
                description: "Transitioned to freelance consulting, working with startups and established companies to build scalable web applications. Specialized in modern frameworks like Next.js, Vue.js, and cloud architecture on AWS and Vercel."
            },
            2024: {
                title: "Senior Developer & Mentor",
                description: "Currently working as a Senior Developer while mentoring junior developers and contributing to open-source projects. Passionate about sharing knowledge through technical writing and speaking at developer conferences."
            }
        },
        
        // Footer
        footer: "All rights reserved."
    },
    pl: {
        // Hero section
        name: "Twoje Imię",
        title: "Full Stack Developer i Designer",
        summary: "Pasjonat programowania z ponad 5-letnim doświadczeniem w tworzeniu innowacyjnych rozwiązań cyfrowych. Specjalizuję się w nowoczesnych technologiach webowych i uwielbiam przekształcać złożone problemy w proste, piękne projekty. Zawsze chętny do nauki nowych technologii i współpracy przy ekscytujących projektach.",
        getInTouch: "Skontaktuj się",
        viewJourney: "Zobacz moją drogę",
        
        // Timeline section
        myJourney: "Moja Droga",
        
        // Timeline items
        timeline: {
            2019: {
                title: "Dyplom Informatyki",
                description: "Ukończyłem z wyróżnieniem studia na Uniwersytecie z tytułem licencjata informatyki. Specjalizowałem się w inżynierii oprogramowania i rozwoju stron internetowych, budując solidne podstawy w algorytmach, strukturach danych i nowoczesnych paradygmatach programowania."
            },
            2020: {
                title: "Junior Developer w TechCorp",
                description: "Rozpocząłem swoją profesjonalną drogę jako Junior Developer, pracując nad aplikacjami React i ucząc się najlepszych praktyk branżowych. Współpracowałem z seniorskimi programistami przy wielu projektach klienckich i zdobyłem cenne doświadczenie w metodykach zwinnego rozwoju."
            },
            2022: {
                title: "Full Stack Developer",
                description: "Awansowałem na stanowisko Full Stack Developer, podejmując się bardziej złożonych projektów obejmujących Node.js, bazy danych i wdrażanie w chmurze. Prowadziłem zespół 3 programistów przy dużej platformie e-commerce, która zwiększyła przychody klienta o 40%."
            },
            2023: {
                title: "Konsultant Freelancer",
                description: "Przeszedłem na freelancing, pracując ze startupami i uznanymi firmami nad budową skalowalnych aplikacji webowych. Specjalizowałem się w nowoczesnych frameworkach jak Next.js, Vue.js oraz architekturze chmurowej na AWS i Vercel."
            },
            2024: {
                title: "Senior Developer i Mentor",
                description: "Obecnie pracuję jako Senior Developer, jednocześnie mentorując młodszych programistów i przyczyniając się do projektów open-source. Pasjonuję się dzieleniem wiedzy poprzez pisanie techniczne i wystąpienia na konferencjach dla programistów."
            }
        },
        
        // Footer
        footer: "Wszelkie prawa zastrzeżone."
    }
};

// Current language state
let currentLanguage = localStorage.getItem('language') || 'en';

// Translation function
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || key;
}

// Language switching function
function switchLanguage(lang) {
    if (currentLanguage === lang) return;
    
    // Get hero elements that have original animations
    const heroElements = [
        document.querySelector('.name'),
        document.querySelector('.title'),
        document.querySelector('.summary'),
        document.querySelector('.contact-links')
    ].filter(Boolean);
    
    // Get timeline elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Get other elements for simple fade
    const otherElements = [
        document.querySelector('.section-title'),
        document.querySelector('.footer p')
    ].filter(Boolean);
    
    // Force reflow and start fade-out animation for hero and other elements
    [...heroElements, ...otherElements].forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        element.classList.add('text-fade-out');
    });
    
    // Fade out timeline items using CSS classes
    timelineItems.forEach(item => {
        // Remove all animation states and reset to initial hidden state
        item.classList.remove('animate', 'fade-in');
        item.classList.add('fade-out');
        
        // Reset child element animations
        const childElements = item.querySelectorAll('.timeline-image, .timeline-date, .timeline-title, .timeline-description');
        childElements.forEach(child => {
            child.classList.remove('fade-in-up');
            child.style.animationDelay = '';
        });
    });
    
    // Update content after fade-out
    setTimeout(() => {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updateContent();
        
        // Retrigger original hero animations
        heroElements.forEach((element, index) => {
            element.classList.remove('text-fade-out');
            
            // Special handling for name element with typewriter effect
            if (element.classList.contains('name')) {
                const nameText = t('name');
                
                // Immediately clear the element and start typewriter
                element.textContent = '';
                element.style.animation = 'none';
                
                // Start typewriter effect immediately
                window.typeWriter(element, nameText, 150);
            } else {
                // Reset and retrigger the original slideInRight animation for other elements
                element.style.animation = 'none';
                element.offsetHeight; // Force reflow
                
                const delays = ['0.3s', '0.5s', '0.7s', '0.9s']; // Original delays from CSS
                const delayIndex = element.classList.contains('title') ? 1 : 
                                 element.classList.contains('summary') ? 2 : 3;
                element.style.animation = `slideInRight 1s ease-out ${delays[delayIndex]} both`;
                
                // Clean up after animation completes
                setTimeout(() => {
                    element.style.animation = '';
                }, 1000 + parseFloat(delays[delayIndex]) * 1000);
            }
        });
        
        // Simple fade-in for other elements
        otherElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove('text-fade-out');
                element.style.animation = `fadeInUpStagger 0.6s ease-out forwards`;
                
                setTimeout(() => {
                    element.style.animation = '';
                }, 600);
            }, index * 50);
        });
        
        // Retrigger timeline animations with CSS classes and staggered timing
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                // Remove fade-out class
                item.classList.remove('fade-out');
                
                // Check if the item is currently visible in viewport
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    // If visible, animate immediately with fade-in class
                    item.classList.add('fade-in');
                    
                    // Clean up and set to animate state after animation
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                        item.classList.add('animate');
                    }, 600);
                } else {
                    // If not visible, reset to initial state so intersection observer can handle it
                    // Don't add any animation classes - let the observer handle it when scrolled into view
                }
            }, 400 + (index * 100)); // Stagger timeline items
        });
    }, 250);
    
    // Update language buttons immediately
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Update content function
function updateContent() {
    // Hero section
    document.querySelector('.name').textContent = t('name');
    document.querySelector('.title').textContent = t('title');
    document.querySelector('.summary').textContent = t('summary');
    document.querySelector('.contact-btn').textContent = t('getInTouch');
    document.querySelector('.scroll-btn').textContent = t('viewJourney');
    
    // Timeline section
    document.querySelector('.section-title').textContent = t('myJourney');
    
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const years = ['2019', '2020', '2022', '2023', '2024'];
    
    timelineItems.forEach((item, index) => {
        const year = years[index];
        const titleElement = item.querySelector('.timeline-title');
        const descriptionElement = item.querySelector('.timeline-description');
        
        if (titleElement && descriptionElement) {
            titleElement.textContent = t(`timeline.${year}.title`);
            descriptionElement.textContent = t(`timeline.${year}.description`);
        }
    });
    
    // Footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = `&copy; 2024 ${t('name')}. ${t('footer')}`;
    }
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
}

// Export functions for use in other files
window.translations = { t, updateContent, switchLanguage, currentLanguage };