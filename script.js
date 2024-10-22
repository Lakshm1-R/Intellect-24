const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    burger.classList.toggle('toggle');
});
// Close the menu after a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');  // Also toggle back the burger icon

        // Clear animations when a link is clicked
        navLinks.forEach(link => link.style.animation = '');
    });
});


    // Variables
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const gridItems = document.querySelectorAll('.grid-item img');
    const closeLightbox = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenGallery = document.getElementById('hidden-gallery');
    let currentIndex = 0;

    // Open Lightbox
    function activateLightbox() {
        const allImages = document.querySelectorAll('.masonry-grid img');
        allImages.forEach((item, index) => {
            item.addEventListener('click', () => {
                // lightbox.style.display = 'flex';
               // Assume lightboxImg is the image element inside the lightbox
lightbox.style.display = 'flex';

// Get the width and height from the image tag
const width = lightboxImg.getAttribute('width');
const height = lightboxImg.getAttribute('height');

// Set the width and height for the lightbox image
if (width && height) {
    lightboxImg.style.width = width - '500px';
    lightboxImg.style.height = height - '500px';
} else {
    // If the width/height attribute is missing, you can use default values
    lightboxImg.style.width = '100%';  // Fit the lightbox container by default
    lightboxImg.style.height = 'auto'; // Maintain aspect ratio
}

                lightboxImg.src = item.src;
                currentIndex = index;
            });
        });
    }
    activateLightbox();

    // Close Lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Next/Previous Controls
    function showImage(index) {
        const images = Array.from(document.querySelectorAll('.masonry-grid img'));
        currentIndex = (index + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));

    // Auto Slideshow
    setInterval(() => {
        if (lightbox.style.display === 'flex') {
            showImage(currentIndex + 1);
        }
    }, 3000);

    // Load More functionality
    loadMoreBtn.addEventListener('click', () => {
        hiddenGallery.style.display = 'block'; // Show hidden images
        loadMoreBtn.style.display = 'none'; // Hide Load More button
        activateLightbox(); // Re-activate lightbox functionality for new images
    });


