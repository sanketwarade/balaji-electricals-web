function openMenu() {
    document.getElementById('navbar').classList.add('active');
    document.querySelector('.hamburger').style.display = 'none';  // Hide hamburger when menu opens
    document.querySelector('.close-btn').style.opacity = '1';  // Show close button
}

function closeMenu() {
    document.getElementById('navbar').classList.remove('active');
    document.querySelector('.hamburger').style.display = 'block';  // Show hamburger when menu closes
    document.querySelector('.close-btn').style.opacity = '0';  // Hide close button
}

