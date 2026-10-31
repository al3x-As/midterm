// Load the navbar
fetch('../components/navbar.html')
  .then(response => response.text())
  .then(data => {

    // Add navbar to the page
    document.getElementById('navbar').innerHTML = data;

    // Hamburger menu
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Dark mode
    const modeToggle = document.querySelector('.dark-lightmode');

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    // Change theme when clicked
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');

      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });

    // Highlight the current page
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();

    document.querySelectorAll('.navbar-menu li a').forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop().toLowerCase();

      if (linkPage === currentPage || (currentPage === '' && linkPage === 'home.html')) {
        link.classList.add('active');
      }
    });

  })
  .catch(error => console.log('Error loading navbar:', error));
