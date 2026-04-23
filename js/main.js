/**
 * CIRKLEUP LANDING PAGE - MODERN JAVASCRIPT
 * 2025 Best Practices: ES6+, Async/Await, Proper Error Handling
 */

// ========================================
// 1. CONFIGURATION
// ========================================

const CONFIG = {
    // Email service endpoint (replace with your actual endpoint)
    apiEndpoint: 'YOUR_API_ENDPOINT_HERE',
    
    // Form validation settings
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // UI timing
    successDisplayTime: 5000, // 5 seconds
};

// ========================================
// 2. DOM ELEMENTS
// Cache DOM queries for performance
// ========================================

const elements = {
    form: document.getElementById('waitlistForm'),
    emailInput: document.getElementById('email'),
    submitButton: document.querySelector('.btn-primary'),
    errorMessage: document.getElementById('emailError'),
    heroSection: document.querySelector('.hero'),
    successMessage: document.getElementById('successMessage'),
};

// ========================================
// 3. FORM VALIDATION
// ========================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
    return CONFIG.emailRegex.test(email.trim());
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.emailInput.classList.add('error');
    elements.emailInput.setAttribute('aria-invalid', 'true');
}

/**
 * Clear error message
 */
function clearError() {
    elements.errorMessage.textContent = '';
    elements.emailInput.classList.remove('error');
    elements.emailInput.setAttribute('aria-invalid', 'false');
}

/**
 * Real-time validation on input
 */
elements.emailInput.addEventListener('input', () => {
    if (elements.errorMessage.textContent) {
        clearError();
    }
});

// ========================================
// 4. FORM SUBMISSION
// ========================================

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    const email = elements.emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showError('Please enter your email address');
        elements.emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        elements.emailInput.focus();
        return;
    }
    
    // Clear any previous errors
    clearError();
    
    // Set loading state
    setLoadingState(true);
    
    try {
        // Submit to backend
        const success = await submitToWaitlist(email);
        
        if (success) {
            // Show success message
            showSuccessMessage();
            
            // Track event (if analytics is set up)
            trackEvent('waitlist_signup', { email });
            
            // Clear form
            elements.form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showError('Something went wrong. Please try again.');
    } finally {
        // Remove loading state
        setLoadingState(false);
    }
}

/**
 * Set form loading state
 * @param {boolean} isLoading - Loading state
 */
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

/**
 * Show success message
 */
function showSuccessMessage() {
    // Hide form
    elements.heroSection.style.display = 'none';
    
    // Show success message
    elements.successMessage.hidden = false;
    
    // Focus for screen readers
    elements.successMessage.focus();
    
    // Optionally hide success message after delay
    // setTimeout(() => {
    //     elements.successMessage.hidden = true;
    //     elements.heroSection.style.display = 'block';
    // }, CONFIG.successDisplayTime);
}

// Attach submit handler
elements.form.addEventListener('submit', handleSubmit);

// ========================================
// 5. API SUBMISSION
// ========================================

/**
 * Submit email to waitlist
 * @param {string} email - User's email
 * @returns {Promise<boolean>} - Success status
 */
async function submitToWaitlist(email) {
    // OPTION 1: Use your own backend API
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
    
    // OPTION 2: Google Sheets (using Apps Script)
    // Tutorial: https://github.com/jamiewilson/form-to-google-sheets
    // Uncomment and add your script URL:
    /*
    try {
        await fetch('YOUR_GOOGLE_SCRIPT_URL', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return true;
    } catch (error) {
        console.error('Google Sheets error:', error);
        return false;
    }
    */
    
    // OPTION 3: For demo/testing - save to localStorage
    console.log('📧 Email submitted (demo mode):', email);
    saveToLocalStorage(email);
    return true;
}

/**
 * Save email to localStorage (demo/testing only)
 * @param {string} email - Email to save
 */
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
// 6. ANALYTICS TRACKING
// ========================================

/**
 * Track analytics event
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
function trackEvent(eventName, params = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    
    // Plausible Analytics (privacy-friendly alternative)
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
// 7. KEYBOARD SHORTCUTS
// ========================================

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardShortcuts(e) {
    // Escape key - clear form
    if (e.key === 'Escape') {
        elements.form.reset();
        clearError();
        elements.emailInput.blur();
    }
    
    // Cmd/Ctrl + K - focus email input
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        elements.emailInput.focus();
    }
}

document.addEventListener('keydown', handleKeyboardShortcuts);

// ========================================
// 8. PERFORMANCE MONITORING
// ========================================

/**
 * Log page load performance
 */
window.addEventListener('load', () => {
    // Use Performance API
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        
        // Track with analytics
        trackEvent('page_performance', {
            load_time: pageLoadTime,
            page: 'landing',
        });
    }
});

// ========================================
// 9. ERROR HANDLING
// ========================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Optionally track errors with analytics
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        stack: event.error?.stack || '',
    });
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    trackEvent('promise_rejection', {
        reason: event.reason?.message || 'Unknown rejection',
    });
});

// ========================================
// 10. SERVICE WORKER (OPTIONAL)
// For offline support and caching
// ========================================

/**
 * Register service worker
 * Uncomment to enable offline support
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}
*/

// ========================================
// 11. ACCESSIBILITY
// ========================================

/**
 * Announce to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ========================================
// 12. UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if user is online
 * @returns {boolean} - Online status
 */
function isOnline() {
    return navigator.onLine;
}

// Listen for online/offline events
window.addEventListener('online', () => {
    console.log('✅ Back online');
    announceToScreenReader('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('⚠️ Offline');
    announceToScreenReader('No internet connection');
});

// ========================================
// 13. INITIALIZATION
// ========================================

/**
 * Initialize app
 */
function init() {
    console.log('🚀 CirkleUp Landing Page initialized');
    
    // Check if form exists
    if (!elements.form) {
        console.error('❌ Form not found');
        return;
    }
    
    // Set initial focus
    elements.emailInput.focus();
    
    // Log environment
    console.log('Environment:', {
        online: isOnline(),
        screen: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent,
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// 14. EXPORT FOR TESTING (OPTIONAL)
// ========================================

// Expose functions for console testing
window.CirkleUpApp = {
    submitToWaitlist,
    trackEvent,
    showSuccessMessage,
    isValidEmail,
};

console.log('💡 Tip: Access app functions via window.CirkleUpApp');
