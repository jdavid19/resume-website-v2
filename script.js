document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const menuLinks = navLinks.querySelectorAll('a');

    // Function to toggle menu visibility
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
    };

    // Add event listener to the menu button
    hamburger.addEventListener('click', toggleMenu);

    // Add event listeners to each menu link to close the menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

   // View Counter
    async function updateCounter(page) {
        try {
            const response = await fetch(`https://xs51dk5m88.execute-api.us-east-1.amazonaws.com/test/counter/${page}`);
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
                const data = JSON.parse(responseData.body);

                // Ensure data has the 'count' property
                if (data && data.count !== undefined) {
                    const counterElement = document.getElementById('view-count');
                    counterElement.innerText = data.count;
                    counterElement.style.color = 'aqua';
                } else {
                    console.error('Invalid response format:', data);
                }
            } catch (error) {
                console.error('Error fetching page count:', error);
            }
        }
    updateCounter('home');  // Pass the page name here


    // Get the button
    const backToTopButton = document.getElementById("backToTop");

    // When the user scrolls down 100px from the top of the document, show the button
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});
