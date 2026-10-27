function scrollCarousel(distance) {
  const track = document.querySelector('.card-container');
  if (track) {
    track.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }
}