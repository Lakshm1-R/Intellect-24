// Filtering and Search Logic
const techFilter = document.getElementById('tech-filter');
const nonTechFilter = document.getElementById('non-tech-filter');
const searchBar = document.getElementById('search-bar');
const eventCards = document.querySelectorAll('.event-card');
let currentPage = 1;
const cardsPerPage = 2; // Set the number of event cards to display per page

// Filter Events
function filterEvents() {
    const searchText = searchBar.value.toLowerCase();
    eventCards.forEach(card => {
        const isTech = card.classList.contains('tech');
        const isNonTech = card.classList.contains('non-tech');
        const matchesSearch = card.textContent.toLowerCase().includes(searchText);

        if ((techFilter.checked && isTech || nonTechFilter.checked && isNonTech) && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listeners for filtering
techFilter.addEventListener('change', filterEvents);
nonTechFilter.addEventListener('change', filterEvents);
searchBar.addEventListener('input', filterEvents);

// Pagination Logic
function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;

    eventCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    document.getElementById('page-info').textContent = `Page ${page} of ${Math.ceil(eventCards.length / cardsPerPage)}`;
}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < Math.ceil(eventCards.length / cardsPerPage)) {
        currentPage++;
        displayPage(currentPage);
    }
});

// Initial Page Display
displayPage(currentPage);




// navbar 
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