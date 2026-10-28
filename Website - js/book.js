document.addEventListener("DOMContentLoaded", () => {
  // Using querySelector instead of getElementById
  const playerCountSelect = document.querySelector("#playerCount");
  const totalPriceElement = document.querySelector("#totalPrice");
  const bookingDateInput = document.querySelector("#bookingDate");
  const bookingForm = document.querySelector("#bookingForm");

  // Price matrix per player count
  const prices = {
    "2": 40, // €20 x 2
    "3": 54, // €18 x 3
    "4": 64, // €16 x 4
    "5": 75, // €15 x 5
    "6": 84  // €14 x 6
  };

  // Prevent past dates in datepicker
  if (bookingDateInput) {
    const today = new Date().toISOString().split("T")[0];
    bookingDateInput.min = today;
  }

  // Update price dynamically on player count change
  if (playerCountSelect && totalPriceElement) {
    playerCountSelect.addEventListener("change", (e) => {
      const count = e.target.value;
      totalPriceElement.textContent = `€${prices[count] || 64}`;
    });
  }

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const room = document.querySelector("#roomSelect").value;
      const date = document.querySelector("#bookingDate").value;
      const time = document.querySelector("#timeSlot").value;
      const name = document.querySelector("#fullName").value;

      const modalDetails = document.querySelector("#modalDetails");
      if (modalDetails) {
        modalDetails.innerText = `Thank you, ${name}! Your booking for "${room}" on ${date} at ${time} is confirmed.`;
      }

      // Display success modal
      const successModal = document.querySelector("#successModal");
      if (successModal) {
        successModal.style.display = "flex";
      }
    });
  }
});

// Close modal function using querySelector
function closeModal() {
  const successModal = document.querySelector("#successModal");
  const bookingForm = document.querySelector("#bookingForm");
  const totalPrice = document.querySelector("#totalPrice");

  if (successModal) successModal.style.display = "none";
  if (bookingForm) bookingForm.reset();
  if (totalPrice) totalPrice.textContent = "€64";
}