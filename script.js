// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Copy contract address functionality
function copyContract() {
    const contractAddress = document.getElementById('contractAddress').textContent;
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showCopyFeedback();
        }).catch(err => {
            // Fallback to older method
            fallbackCopyTextToClipboard(contractAddress);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyTextToClipboard(contractAddress);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = 'rgba(34, 197, 94, 0.2)';
    copyBtn.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    copyBtn.style.color = '#22c55e';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        copyBtn.style.color = '#ffffff';
    }, 2000);
}

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to why cards
    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.why-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.why-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Opening...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
    
    // Add smooth scrolling for any internal links
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
    
    // Add parallax effect to floating squares
    let ticking = false;
    
    function updateSquares() {
        const scrolled = window.pageYOffset;
        const squares = document.querySelectorAll('.square');
        
        squares.forEach((square, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            square.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateSquares);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for entrance animations
    document.querySelectorAll('.metric-card, .why-card, .philosophy-section, .contract-section, .join-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Simulate live data updates (optional - for demo purposes)
function simulateLiveDataUpdate() {
    // This would normally fetch real data from an API
    // For now, just update the timestamp
    updateTime();
}

// Update live data every 30 seconds (as mentioned in the disclaimer)
setInterval(simulateLiveDataUpdate, 30000);

// Add some visual feedback for the live data indicator
setInterval(() => {
    const liveDot = document.querySelector('.live-dot');
    if (liveDot) {
        liveDot.style.transform = 'scale(1.2)';
        setTimeout(() => {
            liveDot.style.transform = 'scale(1)';
        }, 200);
    }
}, 5000);
