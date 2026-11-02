function loadFooter() { 
  fetch("../components/footer.html")
    //take raw response and convert to plain text html code
    .then(function(footertext) {
      return footertext.text();
    })
    //finds the footer and place it on the website
    .then(function(data) {
      const footer = document.querySelector("#footer");
      if (footer) {
        footer.innerHTML = data;
      }
    })
    .catch(function(err) {
      console.error("Error loading footer:", err);
    });
}

// Wait for the page structure to load before calling the function
document.addEventListener("DOMContentLoaded", loadFooter);