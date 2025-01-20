function openMenu() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    navbar.style.right = '0'; // Slide menu in from the left
    navbar.classList.add('active'); // Add active class
    hamburger.classList.add('active'); // Add active class to the hamburger icon
    hamburger.style.display = 'none'; // Hide the hamburger menu
}

function closeMenu() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    navbar.style.right = '100%'; // Hide menu to the left
    navbar.classList.remove('active'); // Remove active class
    hamburger.classList.remove('active'); // Remove active class from the hamburger icon
    setTimeout(() => {
    hamburger.style.display = 'block'; // Show the hamburger menu again
}, 500); // Delay to match the transition duration
}
