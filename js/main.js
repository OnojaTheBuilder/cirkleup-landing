/**
 * CIRKLEUP LANDING PAGE - JAVASCRIPT
 * Complete functionality with form validation, modals, and animations
 */

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    // Email service endpoint (replace with your actual endpoint)
    apiEndpoint: 'YOUR_API_ENDPOINT_HERE',
    
    // Form validation
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // UI timing
    successDisplayTime: 5000,
};

// ========================================
// DOM ELEMENTS
// ========================================

const elements = {
    form: document.getElementById('waitlistForm'),
    emailInput: document.getElementById('emailInput'),
    submitButton: document.querySelector('.btn-primary'),
    successModal: document.getElementById('successModal'),
};

// ========================================
// FORM VALIDATION
// ========================================

function isValidEmail(email) {
    return CONFIG.emailRegex.test(email.trim());
}

function showError(input, message) {
    // Create error element if it doesn't exist
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.cssText = 'display: block; color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; text-align: left;';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    input.style.borderColor = '#ef4444';
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.style.borderColor = '';
}

// Clear error on input
if (elements.emailInput) {
    elements.emailInput.addEventListener('input', function() {
        clearError(this);
    });
}

// ========================================
// FORM SUBMISSION
// ========================================

async function handleSubmit(e) {
    e.preventDefault();
    
    const email = elements.emailInput.value.trim();
    
    // Validate
    if (!email) {
        showError(elements.emailInput, 'Please enter your email address');
        elements.emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showError(elements.emailInput, 'Please enter a valid email address');
        elements.emailInput.focus();
        return;
    }
    
    // Clear errors
    clearError(elements.emailInput);
    
    // Set loading state
    setLoadingState(true);
    
    try {
        // Submit to backend
        const success = await submitToWaitlist(email);
        
        if (success) {
            // Show success modal
            showSuccessModal();
            
            // Track event
            trackEvent('waitlist_signup', { email });
            
            // Clear form
            elements.form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showError(elements.emailInput, 'Something went wrong. Please try again.');
    } finally {
        // Remove loading state
        setLoadingState(false);
    }
}

function setLoadingState(isLoading) {
    if (isLoading) {
        elements.submitButton.disabled = true;
        elements.submitButton.classList.add('loading');
        elements.emailInput.disabled = true;
    } else {
        elements.submitButton.disabled = false;
        elements.submitButton.classList.remove('loading');
        elements.emailInput.disabled = false;
    }
}

// Attach form submit handler
if (elements.form) {
    elements.form.addEventListener('submit', handleSubmit);
}

// ========================================
// API SUBMISSION
// ========================================

async function submitToWaitlist(email) {
    // OPTION 1: Use your backend API
    if (CONFIG.apiEndpoint !== 'YOUR_API_ENDPOINT_HERE') {
        try {
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    timestamp: new Date().toISOString(),
                    source: 'landing-page',
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('API submission error:', error);
            return false;
        }
    }
    
    // OPTION 2: For demo - save to localStorage
    console.log('📧 Email submitted (demo mode):', email);
    saveToLocalStorage(email);
    return true;
}

function saveToLocalStorage(email) {
    try {
        const emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        emails.push({
            email,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem('waitlistEmails', JSON.stringify(emails));
        console.log('✅ Saved to localStorage. Total emails:', emails.length);
    } catch (error) {
        console.error('localStorage error:', error);
    }
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function showSuccessModal() {
    if (elements.successModal) {
        elements.successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (elements.successModal) {
        elements.successModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
if (elements.successModal) {
    elements.successModal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// SCROLL FUNCTIONS
// ========================================

function scrollToTop() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus email input after scroll
        setTimeout(() => {
            if (elements.emailInput) {
                elements.emailInput.focus();
            }
        }, 500);
    }
}

// Make scrollToTop available globally
window.scrollToTop = scrollToTop;

// ========================================
// ANALYTICS TRACKING
// ========================================

function trackEvent(eventName, params = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    
    // Plausible Analytics
    if (typeof plausible !== 'undefined') {
        plausible(eventName, { props: params });
    }
    
    // Console log for debugging
    console.log('📊 Event tracked:', eventName, params);
}

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER (Animations on Scroll)
// ========================================

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

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.problem-card, .feature, .step, .comparison-wrapper'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ========================================
// AVATAR 3D TILT EFFECT
// ========================================

document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 5;
        const rotateY = (centerX - x) / 5;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    });
    
    avatar.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        
        trackEvent('page_performance', {
            load_time: pageLoadTime,
            page: 'landing',
        });
    }
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        stack: event.error?.stack || '',
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    trackEvent('promise_rejection', {
        reason: event.reason?.message || 'Unknown rejection',
    });
});

// ========================================
// ONLINE/OFFLINE DETECTION
// ========================================

function handleOnline() {
    console.log('✅ Back online');
}

function handleOffline() {
    console.log('⚠️ Offline');
    if (elements.emailInput) {
        showError(elements.emailInput, 'No internet connection. Please check your connection and try again.');
    }
}

window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('🚀 CirkleUp Landing Page initialized');
    
    // Check if form exists
    if (!elements.form) {
        console.error('❌ Form not found');
        return;
    }
    
    // Log environment
    console.log('Environment:', {
        online: navigator.onLine,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent.split(' ').slice(-2).join(' '),
    });
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// EXPORT FOR TESTING
// ========================================

window.CirkleUpApp = {
    submitToWaitlist,
    showSuccessModal,
    closeModal,
    scrollToTop,
    trackEvent,
    isValidEmail,
};

console.log('💡 Tip: Access app functions via window.CirkleUpApp');
