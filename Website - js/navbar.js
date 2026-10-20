class MyNavbar extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname.split('/').pop() || '../Website-html/Home.html';

    this.innerHTML = `
      <nav class="navbar">
        <div class="logo">LockBox</div>

        <!-- Hamburger Toggle Button -->
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <!-- Navigation Links -->
        <ul class="nav-links" id="navLinks">
          <li> <a href="../Website-html/Home.html" class="${currentPath === '../Website-html/Home.html' ? 'active' : ''}">Home</a>  </li>
          <li> <a href="../Website-html/About.html" class="${currentPath === '../Website-html/About.html' ? 'active' : ''}">About</a> </li>
          <li> <a href="../Website-html/book.html" class="${currentPath === '../Website-html/Book.html' ? 'active' : ''}">Booking</a>  </li>
          <li> <a href="../Website-html/Reservations.html" class="${currentPath === '../Website-html/Reservations.html' ? 'active' : ''}">Reservations</a>  </li>
          <li> <a href="../Website-html/Contact.html" class="${currentPath === '../Website-html/Contact.html' ? 'active' : ''}">Contact</a>  </li>
        </ul>
      </nav>
    `;

    

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

customElements.define('my-navbar', MyNavbar);