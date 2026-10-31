document.addEventListener("DOMContentLoaded", () => {
  fetch('../components/footer.html')
    .then(res => res.text())
    .then(data => {
      const footerContainer = document.getElementById('footer');
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch(err => console.error('Error loading footer component:', err));
});