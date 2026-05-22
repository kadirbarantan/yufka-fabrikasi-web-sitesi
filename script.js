// script.js - Vanilla JS Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('bg-card/95', 'backdrop-blur-sm', 'border-border', 'shadow-sm', 'py-1', 'md:py-1');
            header.classList.remove('bg-transparent', 'border-transparent', 'py-2', 'md:py-3');
            // Remove arbitrary colors in classes and apply tailwind classes
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.borderColor = '#D4C4B0';
        } else {
            header.classList.add('bg-transparent', 'border-transparent', 'py-2', 'md:py-3');
            header.classList.remove('bg-card/95', 'backdrop-blur-sm', 'border-border', 'shadow-sm', 'py-1', 'md:py-1');
            header.style.backgroundColor = 'transparent';
            header.style.borderColor = 'transparent';
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileLinks = mobileNav.querySelectorAll('a');

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileNav.classList.remove('hidden');
            menuIconOpen.classList.add('hidden');
            menuIconClose.classList.remove('hidden');
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.borderColor = '#D4C4B0';
        } else {
            mobileNav.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
            handleScroll(); // Reset header to scroll state
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 3. Fade-In Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Wholesale Form Submission to WhatsApp
    const form = document.getElementById('wholesale-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const businessType = document.getElementById('businessType').value;
            const message = document.getElementById('message').value;

            const phoneNumber = "905078903811"; // Form WhatsApp numarası
            const text = `Merhaba, bayilik başvurusu yapmak istiyorum. Bilgilerim şöyledir:

*Ad Soyad:* ${name}
*Firma Adı:* ${company}
*Telefon:* ${phone}
*E-posta:* ${email}
*İşletme Türü:* ${businessType}
*Mesaj:* ${message || "Belirtilmedi"}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            
            window.open(whatsappUrl, "_blank");
        });
    }
});
