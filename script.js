// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. LOADING SCREEN LOGIC ===
    const loader = document.getElementById("loader");
    const portfolio = document.getElementById("portfolio");

    // === DIGITAL SCRAMBLE EFFECT LOGIC ===
    const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+1234567890";
    function digitalScramble(element) {
        if(!element.dataset.value) {
            element.dataset.value = element.innerText;
        }
        const originalText = element.dataset.value;
        let iterations = 0;
        
        clearInterval(element.scrambleInterval);
        
        element.scrambleInterval = setInterval(() => {
            element.innerText = originalText.split("")
                .map((letter, index) => {
                    if(letter === " ") return " "; // preserve spaces
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)];
                })
                .join("");
                
            if (iterations >= originalText.length) {
                clearInterval(element.scrambleInterval);
                element.innerText = originalText;
            }
            
            iterations += 1 / 2; // Controls decoding speed
        }, 30);
    }

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            portfolio.style.display = "block";
            
            // Trigger digital scramble on your main name after loader finishes
            const mainName = document.querySelector('.name');
            if (mainName) {
                digitalScramble(mainName);
            }

            // Trigger digital scramble on core skill tags initially
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => digitalScramble(tag));
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
                let currentId = entry.target.getAttribute('id');

                // ADD THESE 3 LINES: Map the multimedia section to the projects nav link
                if (currentId === 'multimedia') {
                    currentId = 'projects';
                }

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Trigger digital scramble on section headers when they scroll into view
                const sectionTitle = entry.target.querySelector('h2');
                if (sectionTitle) {
                    digitalScramble(sectionTitle);
                }

                // Trigger digital scramble on skill tags when sliding into the active view
                const sectionSkills = entry.target.querySelectorAll('.skill-tag');
                sectionSkills.forEach(tag => digitalScramble(tag));
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});

// === 3. OWL CAROUSEL LOGIC ===
$(document).ready(function () {
    // Initialize Owl Carousel
    $(".custom-carousel").owlCarousel({
        autoWidth: true,
        loop: true,
        margin: 20,
        center: true,
        dots: true,
    });

    // UPDATED CLICK FUNCTION: Uses event delegation to target cloned items
    $(".custom-carousel").on("click", ".item", function () {
        // Remove active class from all other items
        $(".custom-carousel .item").not($(this)).removeClass("active");
        // Toggle active class on the clicked item
        $(this).toggleClass("active");
    });
});

// === 4. SECURE CONTACT LINKS ===
    const secureLinks = document.querySelectorAll('.secure-link');
    
    secureLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            // Get the scrambled data and decode it
            const scrambledData = this.getAttribute('data-secure');
            const realLink = atob(scrambledData);
            
            // Smart routing: Web links open in a new tab, Phone/Email open normally
            if(realLink.startsWith('http')) {
                window.open(realLink, '_blank');
            } else {
                window.location.href = realLink;
            }
        });
    });