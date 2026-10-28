fetch('../components/navbar.html')
  .then(response => response.text())
  .then(data => {
    // 1. Inject the navbar HTML into the page container
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = data;
    }

    // 2. Attach Hamburger Menu Toggle
    const navbarToggle = document.querySelector(".navbar-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener("click", () => {
        navbarToggle.classList.toggle("active");
        navbarMenu.classList.toggle("active");
      });
    }

    // 3. Attach Dark Mode Toggle with LocalStorage persistence
    const body = document.body;
    const modeToggle = document.querySelector(".dark-lightmode");

    // Check saved theme preference on page load
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark");
    }

    if (modeToggle) {
      modeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
      });
    }

    // 4. Highlight current active page link automatically
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();
    const navLinks = document.querySelectorAll(".navbar-menu li a");

    navLinks.forEach(link => {
      // Remove any static hardcoded active class first
      link.classList.remove("active");

      const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();
      
      // Compare current page filename to link href
      if (linkPage === currentPage || (currentPage === "" && linkPage === "home.html")) {
        link.classList.add("active");
      }
    });
  })
  .catch(error => console.error('Error loading navbar:', error));