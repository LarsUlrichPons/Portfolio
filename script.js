// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. LOADING SCREEN LOGIC ===
    const loader = document.getElementById("loader");
    const portfolio = document.getElementById("portfolio");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            portfolio.style.display = "block";
        }, 500); 
    }, 3000); 

    // === 2. DYNAMIC NAVIGATION ACTIVE STATE ===
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});

// === 3. OWL CAROUSEL LOGIC ===
// (Uses jQuery document ready function)
$(document).ready(function () {
    
    // Initialize Owl Carousel
    $(".custom-carousel").owlCarousel({
        autoWidth: true,
        loop: true,
        margin: 20,
        center: true,
        dots: true,
    });

    // Handle Click to Expand Cards
    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });
    
});