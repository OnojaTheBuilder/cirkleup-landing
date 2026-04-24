const form = document.getElementById('waitlistForm');
const modal = document.getElementById('successModal');
const emailInput = document.getElementById('emailInput');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    
    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const emails = JSON.parse(localStorage.getItem('emails') || '[]');
        emails.push({ email, date: new Date().toISOString() });
        localStorage.setItem('emails', JSON.stringify(emails));
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        form.reset();
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        console.log('✅ Email submitted:', email);
    }, 1000);
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function scrollToTop() {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => emailInput.focus(), 500);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

console.log('✅ CirkleUp loaded!');