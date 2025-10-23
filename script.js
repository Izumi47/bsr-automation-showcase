// UNO Card Game themed functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeUnoGame();
});

function initializeUnoGame() {
    const flipCards = document.querySelectorAll('.flip-card');
    const navLinks = document.querySelectorAll('.nav-link, .nav-card');
    let flippedCards = new Set();
    let shownNotifications = new Set(); // Track which notifications have been shown
    
    // Initialize UNO features
    createAchievementBadge();
    animateCardsOnLoad();
    setupFlipCards(flipCards, flippedCards, shownNotifications);
    setupNavigation(navLinks);
    setupKeyboardNavigation(flipCards);
    addUnoSoundEffects();
}

function setupFlipCards(cards, flippedCards, shownNotifications) {
    cards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            this.classList.toggle('flipped');
            createCardFlipEffect(this, e);
            
            if (this.classList.contains('flipped')) {
                flippedCards.add(index);
                playCardSound();
                checkUnoAchievements(cards.length, flippedCards, shownNotifications);
            } else {
                flippedCards.delete(index);
            }
            
            // Haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-10px) rotate(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = '';
            }
        });
    });
}

function setupNavigation(links) {
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                createUnoTransition(() => {
                    window.location.href = this.getAttribute('href');
                });
            }
        });
    });
}

function setupKeyboardNavigation(cards) {
    let currentIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        if (!cards.length) return;
        
        const cols = window.innerWidth > 768 ? 3 : 2;
        
        switch(e.key) {
            case 'ArrowRight':
                currentIndex = Math.min(currentIndex + 1, cards.length - 1);
                focusCard(cards, currentIndex);
                break;
            case 'ArrowLeft':
                currentIndex = Math.max(currentIndex - 1, 0);
                focusCard(cards, currentIndex);
                break;
            case 'ArrowDown':
                currentIndex = Math.min(currentIndex + cols, cards.length - 1);
                focusCard(cards, currentIndex);
                break;
            case 'ArrowUp':
                currentIndex = Math.max(currentIndex - cols, 0);
                focusCard(cards, currentIndex);
                break;
            case 'Enter':
            case ' ':
                if (currentIndex >= 0 && cards[currentIndex]) {
                    e.preventDefault();
                    cards[currentIndex].click();
                }
                break;
        }
    });
}

function focusCard(cards, index) {
    cards.forEach(card => card.style.outline = 'none');
    if (cards[index]) {
        cards[index].style.outline = '4px solid #F7B500';
        cards[index].style.outlineOffset = '8px';
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function createCardFlipEffect(element, event) {
    const colors = ['#E4002B', '#0063B1', '#00843D', '#F7B500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const sparkle = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: ${randomColor};
        border-radius: 50%;
        transform: scale(0);
        animation: sparkleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 20px ${randomColor};
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 600);
}

function createUnoTransition(callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #E4002B 0%, #0063B1 50%, #00843D 100%);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka', sans-serif;
        font-size: 4rem;
        color: white;
        font-weight: 700;
        text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    `;
    
    overlay.textContent = 'BSR Automation!';
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
            callback();
        }, 400);
    });
}

function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.flip-card, .nav-card');
    cards.forEach((card, index) => {
        card.classList.add('card-entrance');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function createAchievementBadge() {
    const badge = document.createElement('div');
    badge.className = 'achievement-badge';
    badge.innerHTML = '🎮 BSR UNO';
    document.body.appendChild(badge);
}

function checkUnoAchievements(total, flipped, shownNotifications) {
    if (flipped.size === 1 && !shownNotifications.has('firstCard')) {
        showUnoNotification('🎴 First Card!', 'You drew your first card!', 'success');
        shownNotifications.add('firstCard');
    } else if (flipped.size === Math.ceil(total / 2) && !shownNotifications.has('halfway')) {
        showUnoNotification('🌟 Halfway!', 'You\'re halfway through the deck!', 'success');
        createColorExplosion();
        shownNotifications.add('halfway');
    } else if (flipped.size === total - 1 && !shownNotifications.has('uno')) {
        showUnoNotification('⚡ UNO!', 'One card left!', 'warning');
        shownNotifications.add('uno');
    } else if (flipped.size === total && !shownNotifications.has('winner')) {
        showUnoNotification('🎉 WINNER!', 'You explored all challenges!', 'success');
        createUnoConfetti();
        playWinSound();
        shownNotifications.add('winner');
    }
}

function showUnoNotification(title, message, type) {
    const colors = {
        success: 'linear-gradient(135deg, #00843D, #00A651)',
        warning: 'linear-gradient(135deg, #F7B500, #FFD700)',
        error: 'linear-gradient(135deg, #E4002B, #FF1744)'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: ${colors[type] || colors.success};
        border: 6px solid white;
        color: white;
        padding: 40px 60px;
        border-radius: 30px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: unoNotificationPop 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: 'Fredoka', sans-serif;
    `;
    
    notification.innerHTML = `
        <h3 style="font-size: 2.5rem; margin-bottom: 10px; font-weight: 700; text-shadow: 3px 3px 6px rgba(0,0,0,0.3);">${title}</h3>
        <p style="font-size: 1.2rem; font-weight: 600;">${message}</p>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

function createUnoConfetti() {
    const colors = ['#E4002B', '#0063B1', '#00843D', '#F7B500'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 15 + 10;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${Math.random() * 100}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                border: 2px solid white;
                animation: unoConfettiFall ${2 + Math.random() * 3}s linear;
                z-index: 9999;
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

function createColorExplosion() {
    const colors = ['#E4002B', '#0063B1', '#00843D', '#F7B500'];
    
    colors.forEach((color, index) => {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            background: ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: colorBurst 1s ease-out ${index * 0.1}s;
            z-index: 9998;
            opacity: 0.5;
            pointer-events: none;
        `;
        
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 1000 + (index * 100));
    });
}

function addUnoSoundEffects() {
    // Visual feedback as sound simulation
    window.playCardSound = function() {
        // Visual pulse effect
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10);
    };
    
    window.playWinSound = function() {
        // Create visual win effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(247, 181, 0, 0.3);
            z-index: 9997;
            animation: flashEffect 0.5s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
    };
}

// Add CSS animations via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 0.8;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes unoNotificationPop {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
        }
        15% {
            transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
            opacity: 1;
        }
        85% {
            transform: translate(-50%, -50%) scale(1) rotate(-5deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
            opacity: 0;
        }
    }
    
    @keyframes unoConfettiFall {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes colorBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    @keyframes flashEffect {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(styleSheet);
