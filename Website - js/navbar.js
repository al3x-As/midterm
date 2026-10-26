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
        navbarMenu.classList.toggle("active");
      })


      