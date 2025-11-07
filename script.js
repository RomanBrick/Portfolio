// Debug logging
console.log('Script loaded successfully');

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .about-text');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Counter Animation for Metrics
const counterElements = document.querySelectorAll('.metric-value');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, {
    threshold: 0.5
});

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (target.includes('TB')) {
            element.textContent = displayValue + 'TB' + (hasPlus ? '+' : '');
        } else if (target.includes('M')) {
            element.textContent = displayValue + 'M' + (hasPlus ? '+' : '');
        } else if (target.includes('K')) {
            element.textContent = displayValue + 'K' + (hasPlus ? '+' : '');
        } else if (isPercentage) {
            element.textContent = displayValue + '%';
        } else {
            element.textContent = displayValue + (hasPlus ? '+' : '');
        }
    }, stepTime);
}

counterElements.forEach(el => counterObserver.observe(el));

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const theme = html.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
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

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .projects, .contact');
    const projectCards = document.querySelectorAll('.project-card');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Set initial body opacity
document.body.style.opacity = '0';

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add smooth reveal animation for skills
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
    
    observer.observe(tag);
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Download Resume functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadResume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show immediate feedback
            console.log('Download button clicked');
            
            try {
                // Method 1: Try direct download
                const link = document.createElement('a');
                link.href = './resume/Roman_Goryachev_Resume.pdf';
                link.download = 'Roman_Goryachev_DevOps_Resume.pdf';
                
                // Add to document
                document.body.appendChild(link);
                
                // Try to trigger download
                link.click();
                
                // Clean up
                document.body.removeChild(link);
                
                // Show success toast
                showDownloadToast('success');
                console.log('Download method 1 attempted');
                
                // Fallback: Open in new tab after a short delay
                setTimeout(() => {
                    const fallbackLink = document.createElement('a');
                    fallbackLink.href = './resume/Roman_Goryachev_Resume.pdf';
                    fallbackLink.target = '_blank';
                    document.body.appendChild(fallbackLink);
                    fallbackLink.click();
                    document.body.removeChild(fallbackLink);
                    console.log('Fallback method executed');
                }, 500);
                
            } catch (error) {
                console.error('Download error:', error);
                // Fallback: Direct navigation
                window.open('./resume/Roman_Goryachev_Resume.pdf', '_blank');
                showDownloadToast('success');
            }
        });
    } else {
        console.error('Download button not found');
    }
});

// Show download toast notification
function showDownloadToast(type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    
    if (type === 'success') {
        toast.innerHTML = '<i class="fas fa-check-circle"></i> Resume download started!';
        toast.style.background = '#10b981';
    } else {
        toast.innerHTML = '<i class="fas fa-exclamation-circle"></i> Download failed. Please try again.';
        toast.style.background = '#ef4444';
    }
    
    // Add toast styles
    toast.style.cssText += `
        position: fixed;
        top: 20px;
        right: 20px;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
