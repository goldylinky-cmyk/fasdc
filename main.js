document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
        
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        // Close menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS (robust) =====
document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        // Resolve absolute URL so we can compare paths reliably
        const url = new URL(href, window.location.href);
        if (!url.hash) return;
        if (url.origin !== window.location.origin) return;

        const linkPath = url.pathname.replace(/\/?$/, '');
        const currentPath = window.location.pathname.replace(/\/?$/, '');
        if (linkPath !== currentPath) return;

        const targetId = url.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            window.scrollTo({
                top: targetElement.offsetTop - 80, // adjust -80 to match your header height
                behavior: 'smooth'
            });

            // Update address bar without jump
            history.pushState(null, '', targetId);

            // Close mobile menu if open
            if (typeof navMenu !== 'undefined' && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
});

// Smooth-scroll on page load if URL has a hash
if (window.location.hash) {
    const targetOnLoad = document.querySelector(window.location.hash);
    if (targetOnLoad) {
        setTimeout(() => {
            window.scrollTo({
                top: targetOnLoad.offsetTop - 80,
                behavior: 'smooth'
            });
        }, 50);
    }
}

    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const pageHeader = document.querySelector('.page-header');

    window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const headerHeight = pageHeader ? pageHeader.offsetHeight : 0;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < (headerHeight + 100)) {
        // Near page header - show navbar
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll < lastScroll) {
        // Scroll up (but not near header) - show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                   
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('small');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.style.borderColor = '#ddd';
                    
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                
                // Create lightbox modal
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <p>${imgAlt}</p>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });
        
        // Image cycling on hover
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const imageTrack = card.querySelector('.image-track');
        const images = card.querySelectorAll('.project-image-carousel img');
        
        if (images.length > 1) {
            let currentImage = 0;
            let interval;
            
            // Start cycling on hover
            card.addEventListener('mouseenter', () => {
                interval = setInterval(() => {
                    currentImage = (currentImage + 1) % images.length;
                    imageTrack.style.transform = `translateX(-${currentImage * (100 / images.length)}%)`;
                }, 2000); // Change image every 2 seconds
            });
            
            // Stop cycling on mouse leave
            card.addEventListener('mouseleave', () => {
                clearInterval(interval);
                // Reset to first image
                currentImage = 0;
                imageTrack.style.transform = 'translateX(0)';
            });
        }
    });
});

        // Add lightbox styles dynamically
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 70vh;
                display: block;
                margin: 0 auto;
            }
            
            .lightbox-content p {
                color: white;
                text-align: center;
                margin-top: 15px;
                font-size: 1.1rem;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                background: none;
                border: none;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);
    }
});

// ===== SIMPLE CAROUSEL THAT WILL WORK =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing carousels...');
    
    // Find all carousel containers
    const carousels = document.querySelectorAll('.project-image');
    
    if (carousels.length === 0) {
        console.log('No carousels found on this page');
        return;
    }
    
    console.log('Found', carousels.length, 'carousel(s)');
    
    carousels.forEach((carouselContainer, index) => {
        console.log('Setting up carousel', index + 1);
        
        const track = carouselContainer.querySelector('.image-track');
        const images = track.querySelectorAll('img');
        const dots = carouselContainer.querySelectorAll('.carousel-dot');
        
        if (images.length <= 1) {
            console.log('Only 1 image, no carousel needed');
            return; // Skip if only one image
        }
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        // 1. First, fix the display issue
        track.style.display = 'flex';
        track.style.transition = 'transform 0.5s ease';
        
        // 2. Set initial widths properly
        function updateTrackWidth() {
            const containerWidth = carouselContainer.offsetWidth;
            console.log('Container width:', containerWidth);
            
            // Set total track width
            track.style.width = `${containerWidth * totalImages}px`;
            
            // Set each image width
            images.forEach(img => {
                img.style.width = `${containerWidth}px`;
                img.style.flexShrink = '0';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
            });
            
            // Move to current slide
            moveToSlide(currentIndex);
        }
        
        // 3. Function to move to a specific slide
        function moveToSlide(slideIndex) {
            const containerWidth = carouselContainer.offsetWidth;
            track.style.transform = `translateX(-${slideIndex * containerWidth}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === slideIndex);
            });
            
            currentIndex = slideIndex;
        }
        
        // 4. Click handlers for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function() {
                console.log('Clicked dot', i);
                moveToSlide(i);
                
                // Restart auto-rotate after manual click
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                    startAutoRotate();
                }
            });
        });
        
        // 5. Auto-rotate functionality
        let autoRotateInterval;
        
        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            
            autoRotateInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % totalImages;
                moveToSlide(nextIndex);
            }, 3000); // Change every 3 seconds
        }
        
        // Pause on hover
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
        });
        
        // Resume on mouse leave
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoRotate();
        });
        
        // 6. Initialize everything when images load
        let loadedCount = 0;
        
        images.forEach(img => {
            // Check if image is already loaded
            if (img.complete) {
                loadedCount++;
                console.log('Image already loaded:', img.src);
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    console.log('Image loaded:', img.src);
                    
                    if (loadedCount === totalImages) {
                        console.log('All images loaded, initializing carousel');
                        updateTrackWidth();
                        startAutoRotate();
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedCount++;
                    console.error('Failed to load image:', img.src);
                    img.style.backgroundColor = '#e0e0e0'; // Gray fallback
                    
                    if (loadedCount === totalImages) {
                        console.log('All images processed, initializing carousel');
                        updateTrackWidth();
                        startAutoRotate();
                    }
                });
            }
        });
        
        // If all images are already loaded
        if (loadedCount === totalImages) {
            console.log('All images were already loaded');
            updateTrackWidth();
            startAutoRotate();
        }
        
        // Handle window resize
        window.addEventListener('resize', updateTrackWidth);
    });
    
    console.log('Carousel setup complete');
});