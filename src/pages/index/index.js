// Display loader only on smaller screens
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        // Show loader for 3 seconds
        setTimeout(() => {
            loader.style.display = 'none';
            document.querySelector('h1').style.display = 'block'; // Show main content
        }, 1500);
    } else {
        // Directly hide loader on larger screens
        loader.style.display = 'none';
        document.querySelector('h1').style.display = 'block'; // Show main content
    }
});

// Hide Loader after Page Load
window.addEventListener('load', function() {
    document.querySelector('.loader').style.display = 'display';
});

// Show Mobile Alert for Small Screens
function checkScreenSize() {
    const mobileAlert = document.getElementById('mobileAlert');
    if (window.innerWidth <= 768) {
        mobileAlert.style.display = 'block';
    } else {
        mobileAlert.style.display = 'none';
    }
}

// Check screen size on load and resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
document.addEventListener("DOMContentLoaded", () => {
const hero = document.querySelector('.hero');
// Delay to simulate a smooth curtain effect
setTimeout(() => {
    hero.classList.add('open'); // Add 'open' class to trigger animation
}, 500); // Delay before curtains start opening
});
function openMenu() {
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
navbar.style.left= '0'; // Slide menu in from the left
navbar.classList.add('active'); // Add active class
hamburger.classList.add('active'); // Add active class to the hamburger icon
hamburger.style.display = 'none'; // Hide the hamburger menu
}

function closeMenu() {
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
navbar.style.left = '-100%'; // Hide menu to the left
navbar.classList.remove('active'); // Remove active class
hamburger.classList.remove('active'); // Remove active class from the hamburger icon
setTimeout(() => {
hamburger.style.display = 'block'; // Show the hamburger menu again
}, 500); // Delay to match the transition duration
}
