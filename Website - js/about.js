function scrollCarousel(distance) {
  
  // Finds and selects the HTML element with the class name "card-container"
  const track = document.querySelector('.card-container');
  
  // Checks if the element was actually found on the page to prevent errors
  if (track) {
    
    // Scrolls the element horizontally by the specified pixel distance
    track.scrollBy({
      left: distance,     
      behavior: 'smooth'  
    });
    
  }
}