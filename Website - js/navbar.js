fetch('../components/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));
    
const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-lightmode");

  modeToggle.addEventListener("click" , () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");
  })

  const navbarToggle = document.querySelector(".navbar-toggle");   
  const navbarMenu = document.querySelector(".navbar-menu");

    navbarToggle.addEventListener("click" , () => {
          navbarToggle.classList.toggle("active");
          avbarMenu.classList.toggle("active");
      })


      