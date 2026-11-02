function loadNavbar() {
  //  Fetch the navbar file
  fetch('../components/navbar.html')
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      // Add navbar to the page safely
      const navbarContainer = document.querySelector('#navbar');
      if (!navbarContainer) return;

      navbarContainer.innerHTML = data;

      //  Setup hamburger menu button
      const toggle = document.querySelector('.navbar-toggle');
      const menu = document.querySelector('.navbar-menu');

      if (toggle && menu) {
        toggle.addEventListener('click', function() {
          toggle.classList.toggle('active');
          menu.classList.toggle('active');
        });
      }

      // Setup dark/light mode toggle
      const modeToggle = document.querySelector('.dark-lightmode');

      // remember past page
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
      }

      // Change theme when clicked
      if (modeToggle) {
        modeToggle.addEventListener('click', function() {
          document.body.classList.toggle('dark');

          if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
          } else {
            localStorage.setItem('theme', 'light');
          }
        });
      }

      // Highlight the active page link
      const currentPage = window.location.pathname.split('/').pop().toLowerCase();

      document.querySelectorAll('.navbar-menu li a').forEach(function(link) {
        const linkPage = link.getAttribute('href').split('/').pop().toLowerCase();

        if (linkPage === currentPage || (currentPage === '' && linkPage === 'home.html')) {
          link.classList.add('active');
        }
      });

    })
    .catch(function(error) {
      console.error('Error loading navbar component:', error);
    });
}

// Wait for the page structure to load before calling the function
document.addEventListener("DOMContentLoaded", loadNavbar);