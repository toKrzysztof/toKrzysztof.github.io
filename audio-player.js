// Audio Player for Background Music
class AudioPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3; // Default volume (30%)
        this.trackName = "My piano recording!";
        this.musicFile = "arabesque.mp3"; // MP3 file in project root
        this.autoplayAttempts = 0;
        this.maxAutoplayAttempts = 5;
        
        this.createAudioElement();
        this.createControls();
        this.setupEventListeners();
    }
    
    createAudioElement() {
        this.audio = new Audio();
        this.audio.src = this.musicFile;
        this.audio.loop = false; // We'll handle looping manually to add silence
        this.audio.volume = this.volume;
        this.audio.preload = 'auto'; // Changed to 'auto' for faster loading
        this.audio.crossOrigin = 'anonymous'; // Handle CORS if needed
    }
    
    createControls() {
        // Create audio control container
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'audio-controls';
        controlsContainer.innerHTML = `
            <div class="audio-player">
                <button class="play-pause-btn" aria-label="Play/Pause music">
                    <span class="play-icon">♪</span>
                </button>
                <div class="volume-control">
                    <button class="volume-btn" aria-label="Volume control">
                        <span class="volume-icon">🔊</span>
                    </button>
                    <input type="range" class="volume-slider" min="0" max="100" value="30">
                </div>
                <div class="track-info">
                    <span class="track-name">${this.trackName}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(controlsContainer);
    }
    
    setupEventListeners() {
        const playPauseBtn = document.querySelector('.play-pause-btn');
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeBtn = document.querySelector('.volume-btn');
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        // Volume button toggle
        volumeBtn.addEventListener('click', () => {
            this.toggleMute();
        });
        
        // Audio events
        this.audio.addEventListener('loadeddata', () => {
            console.log('MP3 file loaded successfully');
            this.attemptAutoPlay(); // Try to play as soon as data is loaded
        });
        
        this.audio.addEventListener('canplay', () => {
            console.log('Audio can start playing');
            this.attemptAutoPlay(); // Try again when audio can play
        });
        
        this.audio.addEventListener('canplaythrough', () => {
            console.log('Audio can play through without stopping');
            this.attemptAutoPlay(); // Try again when fully loaded
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Error loading MP3 file:', e);
            console.error('Make sure "arabesque.mp3" exists in your project root directory');
        });
        
        // Handle manual looping with 5-second silence
        this.audio.addEventListener('ended', () => {
            console.log('Audio ended, waiting 5 seconds before restarting...');
            this.isPlaying = false;
            this.updatePlayButton();
            
            // Wait 5 seconds then restart
            setTimeout(() => {
                if (!this.isPlaying) { // Only restart if user hasn't manually paused
                    this.audio.currentTime = 0;
                    this.play();
                }
            }, 5000); // 5 second delay
        });
        
        // Set up multiple autoplay triggers
        this.setupAutoPlay();
    }
    
    setupAutoPlay() {
        // Immediate autoplay attempt
        setTimeout(() => this.attemptAutoPlay(), 100);
        
        // Multiple fallback attempts with increasing delays
        setTimeout(() => this.attemptAutoPlay(), 500);
        setTimeout(() => this.attemptAutoPlay(), 1000);
        setTimeout(() => this.attemptAutoPlay(), 2000);
        
        // Aggressive user interaction listeners - try to play on ANY interaction
        const playOnInteraction = () => {
            if (!this.isPlaying) {
                this.attemptAutoPlay();
            }
        };
        
        // Listen for various user interactions with immediate response
        const interactionEvents = [
            'click', 'keydown', 'keyup', 'touchstart', 'touchend', 
            'mousemove', 'mousedown', 'mouseup', 'scroll', 'wheel',
            'focus', 'blur', 'resize'
        ];
        
        interactionEvents.forEach(event => {
            document.addEventListener(event, playOnInteraction, { 
                once: false, // Keep listening for multiple attempts
                passive: true 
            });
        });
        
        // Try to play when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !this.isPlaying) {
                this.attemptAutoPlay();
            }
        });
        
        // Try to play when window gains focus
        window.addEventListener('focus', () => {
            if (!this.isPlaying) {
                this.attemptAutoPlay();
            }
        });
        
        // Try to play after a short delay when everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => this.attemptAutoPlay(), 200);
        });
    }
    
    async attemptAutoPlay() {
        // Prevent too many simultaneous attempts
        if (this.isPlaying || this.autoplayAttempts >= this.maxAutoplayAttempts) {
            return;
        }
        
        this.autoplayAttempts++;
        
        try {
            // Ensure audio is ready
            if (this.audio.readyState < 2) {
                // Wait a bit and try again
                setTimeout(() => {
                    this.autoplayAttempts--; // Don't count this as a failed attempt
                    this.attemptAutoPlay();
                }, 100);
                return;
            }
            
            // Try to play
            await this.audio.play();
            this.isPlaying = true;
            this.updatePlayButton();
            console.log('Auto-play successful');
            
            // Hide any existing notification
            const existingNotification = document.querySelector('.autoplay-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
        } catch (error) {
            console.log(`Auto-play attempt ${this.autoplayAttempts} failed:`, error.message);
            
            // Show notification only after several failed attempts
            if (this.autoplayAttempts >= 3) {
                this.showAutoPlayPrompt();
            }
            
            // Reset attempts counter after some time to allow retrying
            setTimeout(() => {
                this.autoplayAttempts = Math.max(0, this.autoplayAttempts - 1);
            }, 5000);
        }
    }
    
    showAutoPlayPrompt() {
        // Don't show multiple notifications
        if (document.querySelector('.autoplay-notification')) {
            return;
        }
        
        // Create a subtle notification that music is available
        const notification = document.createElement('div');
        notification.className = 'autoplay-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="music-note">♪</span>
                <span class="notification-text">Click anywhere to enable background music</span>
                <button class="close-notification" aria-label="Close notification">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 8000);
        
        // Close button functionality
        notification.querySelector('.close-notification').addEventListener('click', (e) => {
            e.stopPropagation();
            notification.remove();
        });
        
        // Hide when music starts playing
        const hideOnPlay = () => {
            if (this.isPlaying && notification.parentNode) {
                notification.remove();
            }
        };
        
        this.audio.addEventListener('play', hideOnPlay, { once: true });
        
        // Try to play when notification is clicked
        notification.addEventListener('click', () => {
            this.attemptAutoPlay();
        });
    }
    
    async togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }
    
    async play() {
        try {
            await this.audio.play();
            this.isPlaying = true;
            this.updatePlayButton();
        } catch (error) {
            console.log('Playback failed:', error);
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
        this.updateVolumeIcon();
    }
    
    toggleMute() {
        if (this.audio.volume > 0) {
            this.previousVolume = this.audio.volume;
            this.setVolume(0);
            document.querySelector('.volume-slider').value = 0;
        } else {
            this.setVolume(this.previousVolume || 0.3);
            document.querySelector('.volume-slider').value = (this.previousVolume || 0.3) * 100;
        }
    }
    
    updatePlayButton() {
        const playIcon = document.querySelector('.play-icon');
        const playPauseBtn = document.querySelector('.play-pause-btn');
        
        if (this.isPlaying) {
            playIcon.textContent = '⏸';
            playPauseBtn.setAttribute('aria-label', 'Pause music');
            playPauseBtn.classList.add('playing');
        } else {
            playIcon.textContent = '♪';
            playPauseBtn.setAttribute('aria-label', 'Play music');
            playPauseBtn.classList.remove('playing');
        }
    }
    
    updateVolumeIcon() {
        const volumeIcon = document.querySelector('.volume-icon');
        
        if (this.audio.volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (this.audio.volume < 0.5) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    }
}

// Initialize audio player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.audioPlayer = new AudioPlayer();
});