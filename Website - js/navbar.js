// =====================================
// LOAD NAVBAR
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const navbarContainer = document.querySelector("#navbar-container");

    if (!navbarContainer) {
        console.error("Error: #navbar-container was not found.");
        return;
    }

    // Change this path if your navbar HTML is stored elsewhere.
    fetch("../navbar.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Failed to load navbar.html");
            }

            return response.text();
        })
        .then(function (html) {

            // Insert the external HTML into the page.
            navbarContainer.innerHTML = html;

            // Initialize navbar functionality.
            initializeNavbar();

        })
        .catch(function (error) {
            console.error("Navbar loading error:", error);
        });
});


// =====================================
// INITIALIZE NAVBAR
// =====================================

function initializeNavbar() {

    // Query the navbar elements.
    const navbar = document.querySelector("#navbar");
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector("#nav-links");

    if (!navbar || !menuToggle || !navLinks) {
        console.error("Error: Navbar elements were not found.");
        return;
    }

    // =====================================
    // HIGHLIGHT CURRENT PAGE
    // =====================================

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {

        const linkPage = link
            .getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");
        }
        else {
            link.classList.remove("active");

            link.removeAttribute("aria-current");
        }

    });


    // =====================================
    // MOBILE MENU
    // =====================================

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // =====================================
    // CLOSE MENU AFTER CLICKING A LINK
    // =====================================

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // =====================================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // =====================================

    document.addEventListener("click", function (event) {

        if (
            !navbar.contains(event.target) &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}