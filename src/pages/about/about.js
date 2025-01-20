const slides = [
    {
        title: "Mission",
        points: [
            "Delivering excellence in welding equipment and customer service.",
            "Ensuring the highest standards of quality and reliability.",
            "Empowering industries with innovative solutions.",
        ],
        background: "url('/src/assets/images/MISSION 03.jpg')",
    },
    {
        title: "Vision",
        points: [
            "Becoming the leading provider of innovative welding solutions worldwide.",
            "Enabling industries to achieve greater productivity and efficiency.",
            "Pioneering advancements in automation and industrial processes.",
        ],
        background: "url('/src/assets/images/VISION 03.jpg')",
    },
];

let currentSlide = 0;

function updateSlide() {
    const content = document.getElementById("content");
    const background = document.getElementById("background");

    // Update title and points
    content.querySelector("h2").textContent = slides[currentSlide].title;
    content.querySelector("ul").innerHTML = slides[currentSlide].points
        .map((point) => `<li>${point}</li>`)
        .join("");

    // Update background
    background.style.backgroundImage = slides[currentSlide].background;
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";

    // Update tabs
    document.querySelectorAll(".tabs button").forEach((btn, idx) => {
        btn.classList.toggle("active", idx === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlide();
}

function setSlide(index) {
    currentSlide = index;
    updateSlide();
}

window.onload = updateSlide;
        document.addEventListener("DOMContentLoaded"), () => {
            const loadingScreen = document.getElementById("loading-screen");
            const mainContent = document.getElementById("main-content");

        }
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