// Mobile menu toggle - now slides from right side
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger lines
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Profile photo image switching without hover effect
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    const originalSrc = profilePhoto.dataset.original;
    const hoverSrc = profilePhoto.dataset.hover;

    profilePhoto.addEventListener('mouseover', function () {
        this.src = hoverSrc;
    });

    profilePhoto.addEventListener('mouseout', function () {
        this.src = originalSrc;
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

        // Reset form
        contactForm.reset();
    });
}

// Project gallery functionality
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const projectCards = document.querySelectorAll('.project-card');

    // Handle thumbnail clicks for gallery switching
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const mainImage = this.closest('.project-gallery').querySelector('.main-image');
            const src = this.src;

            // Update main image
            mainImage.src = src;

            // Update active class
            const parentThumbnails = this.parentElement.querySelectorAll('.thumbnail');
            parentThumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle project card clicks for modal view
    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't open modal if clicking on a thumbnail
            if (e.target.classList.contains('thumbnail')) return;

            const projectName = this.querySelector('h4').textContent;
            const thumbnails = this.querySelectorAll('.thumbnail');
            const firstThumbnail = this.querySelector('.thumbnail.active') || thumbnails[0];

            // Open modal
            openProjectModal(projectName, thumbnails, firstThumbnail.src);
        });
    });

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to open project modal
    function openProjectModal(projectName, thumbnails, mainImageSrc) {
        const modal = document.getElementById('project-modal');
        const modalImage = document.getElementById('modal-image');
        const modalThumbnails = document.querySelector('.modal-thumbnails');

        // Set main image
        modalImage.src = mainImageSrc;

        // Clear and populate thumbnails
        modalThumbnails.innerHTML = '';
        thumbnails.forEach(thumb => {
            const thumbClone = thumb.cloneNode(true);
            thumbClone.classList.remove('active');
            thumbClone.addEventListener('click', function () {
                modalImage.src = this.src;

                // Update active class
                document.querySelectorAll('.modal-thumbnails img').forEach(img => {
                    img.classList.remove('active');
                });
                this.classList.add('active');
            });
            modalThumbnails.appendChild(thumbClone);
        });

        // Set first thumbnail as active
        if (modalThumbnails.firstChild) {
            modalThumbnails.firstChild.classList.add('active');
        }

        // Show modal
        modal.style.display = 'block';
    }
});