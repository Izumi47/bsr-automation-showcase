// Modern interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const flipCards = document.querySelectorAll('.flip-card');
    const navLinks = document.querySelectorAll('.nav-link, .nav-card');
    let flippedCards = new Set();
    
    // Initialize features
    createAchievementBadge();
    animateCardsOnLoad();
    setupFlipCards(flipCards, flippedCards);
    setupNavigation(navLinks);
    setupCursorEffects();
    setupKeyboardNavigation(flipCards);
}

function setupFlipCards(cards, flippedCards) {
    cards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            this.classList.toggle('flipped');
            createClickEffect(this, e);
            
            if (this.classList.contains('flipped')) {
                flippedCards.add(index);
                checkAchievements(cards.length, flippedCards);
            } else {
                flippedCards.delete(index);
            }
            
            // Haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
}

function setupNavigation(links) {
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                createPageTransition(() => {
                    window.location.href = this.getAttribute('href');
                });
            }
        });
    });
}

function setupCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 242, 254, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .flip-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
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
        cards[index].style.outline = '2px solid var(--accent-color)';
        cards[index].style.outlineOffset = '4px';
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function createClickEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0, 242, 254, 0.4), transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.8s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

function createPageTransition(callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0f 0%, #667eea 100%);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
            callback();
        }, 500);
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
    badge.innerHTML = '🚀 BSR Automation';
    document.body.appendChild(badge);
}

function checkAchievements(total, flipped) {
    if (flipped.size === Math.ceil(total / 2)) {
        showNotification('🌟 Halfway There!', 'You\'ve explored half the challenges', 'success');
    } else if (flipped.size === total) {
        showNotification('🎉 All Complete!', 'You\'ve explored all challenges', 'success');
        createConfetti();
    }
}

function showNotification(title, message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(102, 126, 234, 0.2));
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 40px 50px;
        border-radius: 24px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: notificationPop 3s cubic-bezier(0.23, 1, 0.32, 1);
    `;
    
    notification.innerHTML = `
        <h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 700;">${title}</h3>
        <p style="font-size: 1.1rem; opacity: 0.9;">${message}</p>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#667eea', '#00f2fe', '#f5576c'][Math.floor(Math.random() * 3)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 3}s linear;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Add CSS animations via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes notificationPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        10% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
        }
        90% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes cardEntrance {
        from {
            opacity: 0;
            filter: blur(10px);
        }
        to {
            opacity: 1;
            filter: blur(0);
        }
    }
    
    .card-entrance {
        animation: cardEntrance 0.8s ease-out both;
    }
`;
document.head.appendChild(styleSheet);
