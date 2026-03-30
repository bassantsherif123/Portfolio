// ==================== Dark/Light Mode Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add animation
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ==================== Smooth Scrolling ====================
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

// ==================== Navbar Shadow on Scroll ====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(30, 64, 175, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(30, 64, 175, 0.1)';
    }
});

// ==================== Form Submission ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, textarea');
        
        // Simple validation
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Show success message (you can integrate with email service here)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            
            // Reset form
            this.reset();
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

const imageModal = document.getElementById('imageModal');
const modalImage = imageModal?.querySelector('img');
const modalCaption = imageModal?.querySelector('.modal-caption');
const modalClose = imageModal?.querySelector('.modal-close');
const certificateThumbnails = document.querySelectorAll('.certificate-thumbnail');

const closeImageModal = () => {
    if (!imageModal) return;
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
};

certificateThumbnails.forEach(card => {
    card.addEventListener('click', () => {
        const image = card.querySelector('img');
        if (!image || !imageModal || !modalImage) return;
        modalImage.src = image.src;
        modalImage.alt = image.alt || 'Certificate';
        modalCaption.textContent = card.dataset.caption || 'Certificate Preview';
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose?.addEventListener('click', closeImageModal);
imageModal?.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const projectModal = document.getElementById('projectModal');
const modalTitle = projectModal?.querySelector('#modalTitle');
const modalImpact = projectModal?.querySelector('.modal-impact');
const modalTags = projectModal?.querySelector('.modal-tags');
const modalBody = projectModal?.querySelector('.modal-body');
const modalCloseBtn = projectModal?.querySelector('.modal-close');
const modalOverlay = projectModal?.querySelector('.modal-overlay');

const detailButtons = document.querySelectorAll('.view-more');
detailButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        if (!card || !projectModal || !modalTitle || !modalImpact || !modalTags || !modalBody) return;

        const title = card.querySelector('.project-summary h3')?.textContent || '';
        const impact = card.querySelector('.project-impact')?.textContent || '';
        const tags = card.querySelectorAll('.project-tags span');
        const details = card.querySelector('.project-details');

        modalTitle.textContent = title;
        modalImpact.textContent = impact;
        modalTags.innerHTML = '';
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag.textContent;
            modalTags.appendChild(span);
        });

        if (details) {
            modalBody.innerHTML = details.innerHTML;
        } else {
            modalBody.innerHTML = '<p>No details available.</p>';
        }

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

modalCloseBtn?.addEventListener('click', closeProjectModal);
modalOverlay?.addEventListener('click', closeProjectModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .project-card, .stat-card, .timeline-content').forEach(el => {
    observer.observe(el);
});

// ==================== CV Link Handler ====================
const cvLink = document.querySelector('.cv-link');
if (cvLink) {
    cvLink.addEventListener('click', function (e) {
        // You can replace this with actual CV file path
        console.log('CV download initiated');
        // e.preventDefault(); // Uncomment and add actual CV file when ready
    });
}

// ==================== Ripple Effect on Buttons ====================
document.querySelectorAll('.btn, .skill-tag, .social-links a').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== Active Navigation Link ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.style.color = 'var(--accent-primary)';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== Cursor Animation (Optional Enhancement) ====================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // You can use this for parallax or other cursor-based effects
    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
});

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    console.log('All images loaded');
                }
            });
        });
    };
    
    preloadImages();
});

// ==================== Mobile Menu Toggle (if needed) ====================
// Add this if you want a hamburger menu for smaller screens
const createMobileMenu = () => {
    const navbar = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth < 768) {
        // Create hamburger button if it doesn't exist
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.classList.add('hamburger');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.style.display = 'none'; // We're using grid responsive
        }
    }
};

createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// ==================== Parallax Effect (optional) ====================
const parallaxElements = document.querySelectorAll('.hero-animation');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
        const scrollPosition = window.scrollY;
        el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ==================== Typewriter Effect for Hero Title ====================
const typewriterEffect = () => {
    const title = document.querySelector('.hero-title');
    const text = title.textContent;
    const highlight = title.querySelector('.highlight');
    const highlightText = highlight ? highlight.textContent : '';
    
    // This is optional - if you want typewriter effect, uncomment
    // title.textContent = '';
    // let index = 0;
    // const type = () => {
    //     if (index < text.length) {
    //         title.textContent += text[index];
    //         index++;
    //         setTimeout(type, 50);
    //     }
    // };
    // type();
};

// Uncomment to enable typewriter
// window.addEventListener('load', typewriterEffect);

// ==================== Scroll Progress Bar ====================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-light));
        width: 0%;
        z-index: 999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ==================== Accessibility: Focus Management ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals/dropdowns if needed
    }
});

console.log('Portfolio loaded successfully! Light/Dark mode enabled.');
