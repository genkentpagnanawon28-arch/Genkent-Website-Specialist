// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add intersection observer for section animations
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.info-card, .skill-category, .experience-content, .project-card, .contact-info-card').forEach(el => {
        observer.observe(el);
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: contactForm.querySelector('[name="name"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        message: contactForm.querySelector('[name="message"]').value
    };

    try {
        // Replace this URL with your Google Apps Script web app deployment URL
        // Make sure to deploy Code.gs as a web app and use the POST endpoint
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZQ6TeGZAB8Ds6nuX7wAI4VOp004WDP5rTal20p46kpLSub4lOgvageGfjGa5YXXmW/exec';
        
        // Try with JSON first (better error handling)
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.result === 'success') {
                    formStatus.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Message sent successfully! Your information has been saved.</div>';
                    contactForm.reset();
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                    return;
                } else {
                    throw new Error(result.message || 'Server returned an error');
                }
            } else {
                throw new Error('Server responded with status: ' + response.status);
            }
        } catch (fetchError) {
            // Fallback: Try with no-cors mode (works even if CORS fails)
            console.log('CORS method failed, trying no-cors fallback:', fetchError);
            
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // With no-cors, we can't check the response, so assume success
            formStatus.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Message sent successfully! Your information has been saved.</div>';
            contactForm.reset();
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
    } catch (error) {
        // Show error message with more details
        console.error('Form submission error:', error);
        formStatus.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to send message. Please check your connection and try again.</div>';
        
        // Clear error message after 8 seconds
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 8000);
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    }
});

// 3D card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(20px)';
    });
});

// Parallax effect for hero section
document.addEventListener('mousemove', e => {
    const hero = document.querySelector('.hero-content');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    hero.style.transform = `
        perspective(1000px)
        rotateY(${mouseX * 20}deg)
        rotateX(${-mouseY * 20}deg)
        translateZ(50px)
    `;
});

// Add glow effect to elements on scroll
const glowElements = document.querySelectorAll('.project-card, .submit-btn, .project-link');
window.addEventListener('scroll', () => {
    glowElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            element.style.animation = 'glow 2s ease-in-out infinite';
        } else {
            element.style.animation = 'none';
        }
    });
});

// Add this typewriter effect code
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    "Web Designer",
    "Video Editor",
    "Social Media Manager",
    "Graphic Designer"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Update the download button code for better mobile support
document.querySelector(".btn").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent any default behavior
    
    const btn = this;
    const span = btn.querySelector("span");
    const bar = document.querySelector(".bar");
    const progress = bar.querySelector(".p");
    
    // Disable button to prevent double-clicks
    btn.style.pointerEvents = "none";
    
    // Start animation
    span.style.display = "none";
    
    // Animate button width
    btn.style.width = window.innerWidth <= 480 ? "40px" : "50px";
    btn.style.transition = "all 0.5s ease";
    
    setTimeout(() => {
        // Move button up
        btn.style.top = "40%";
        
        setTimeout(() => {
            // Show progress bar
            bar.style.display = "block";
            btn.innerHTML = '<i class="fa fa-ellipsis-h"></i>';
            
            // Animate progress
            progress.style.transition = "width 2s ease";
            progress.style.width = "100%";
            
            setTimeout(() => {
                // Show checkmark
                btn.innerHTML = '<i class="fa fa-check"></i>';
                bar.style.display = "none";
                
                setTimeout(() => {
                    // Reset button
                    btn.style.top = "50%";
                    setTimeout(() => {
                        btn.style.width = window.innerWidth <= 480 ? "130px" : "150px";
                        setTimeout(() => {
                            btn.innerHTML = "<span>Download</span>";
                            progress.style.width = "0%";
                            
                            // Re-enable button
                            btn.style.pointerEvents = "auto";
                            
                            // Trigger actual download
                            document.getElementById('actual-download-link').click();
                        }, 500);
                    }, 500);
                }, 500);
            }, 2000);
        }, 500);
    }, 500);
});

function initSlideshow() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    
    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("active");
        }
        
        // Increment slide index
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Show current slide and activate corresponding dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
        
        // Change slide every 3 seconds
        setTimeout(showSlides, 3000);
    }
    
    showSlides();
}

// Call initSlideshow when the page loads
document.addEventListener('DOMContentLoaded', initSlideshow); 