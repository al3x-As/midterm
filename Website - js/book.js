// Room details database
const roomDetailsData = {
  "The Haunted Laboratory": {
    image: "../photo/Gemini_Generated_Image_svjcspsvjcspsvjc.jpeg",
    meta: "Difficulty: 4/5 | 2 - 6 Players | 60 Minutes",
    story: "Deep within an abandoned underground medical facility, a top-secret biological experiment went horribly wrong. You and your team are investigative scientists sent to recover the cure before the automated containment protocol triggers a permanent lockdown.",
    highlights: [
      "Live atmospheric lighting & immersive sound effects",
      "Interactive electronic chemical lab puzzles",
      "High suspense with a thrilling storyline"
    ]
  },
  "Ancient Tomb Mystery": {
    image: "../photo/Gemini_Generated_Image_kpn409kpn409kpn4.jpeg",
    meta: "Difficulty: 3/5 | 2 - 6 Players | 60 Minutes",
    story: "While exploring the newly discovered tomb of a forgotten Pharaoh, a sudden sandstorm seals the exit. You have 60 minutes of oxygen remaining to solve ancient Egyptian riddles, align celestial mirrors, and break the ancient curse to break free.",
    highlights: [
      "Authentic mechanical puzzles & physical locks",
      "Great for families and first-time escape room players",
      "Secret hidden passageways to unlock"
    ]
  },
  "Bank Heist Mission": {
    image: "../photo/Gemini_Generated_Image_xitpgxxitpgxxitp.jpeg",
    meta: "Difficulty: 5/5 | 2 - 6 Players | 60 Minutes",
    story: "Your crew has broken into the central bank's high-security vault during a scheduled guard shift change. You must bypass thermal security sensors, crack multi-combination safe codes, and grab the diamond before SWAT surrounds the building in 60 minutes.",
    highlights: [
      "Laser bypass security maze obstacle",
      "Challenging logic and memory puzzles for experienced players",
      "High-stakes thrilling countdown atmosphere"
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const playerCountSelect = document.querySelector("#playerCount");
  const totalPriceElement = document.querySelector("#totalPrice");
  const bookingDateInput = document.querySelector("#bookingDate");
  const bookingForm = document.querySelector("#bookingForm");

  const prices = {
    "2": 40,
    "3": 54,
    "4": 64,
    "5": 75,
    "6": 84
  };

  // Prevent selecting past dates
  if (bookingDateInput) {
    const today = new Date().toISOString().split("T")[0];
    bookingDateInput.min = today;
  }

  // Update total price when player count changes
  if (playerCountSelect && totalPriceElement) {
    playerCountSelect.addEventListener("change", (e) => {
      const count = e.target.value;
      totalPriceElement.textContent = `€${prices[count] || 64}`;
    });
  }

  // Submit reservation
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const room = document.querySelector("#roomSelect").value;
      
      if (!room) {
        alert("Please select a room card above first!");
        return;
      }

      const date = document.querySelector("#bookingDate").value;
      const time = document.querySelector("#timeSlot").value;
      const name = document.querySelector("#fullName").value;

      const modalDetails = document.querySelector("#modalDetails");
      if (modalDetails) {
        modalDetails.innerText = `Thank you, ${name}! Your booking for "${room}" on ${date} at ${time} is confirmed.`;
      }

      const successModal = document.querySelector("#successModal");
      if (successModal) {
        successModal.style.display = "flex";
      }
    });
  }
});

// Select room when clicking anywhere on a room card
function chooseRoom(roomName) {
  const roomSelectInput = document.querySelector("#roomSelect");
  const roomSelectDisplay = document.querySelector("#selectedRoomDisplay");

  if (roomSelectInput) roomSelectInput.value = roomName;
  if (roomSelectDisplay) roomSelectDisplay.value = roomName;

  // Highlight selected card and un-highlight others
  const cards = document.querySelectorAll(".room-card");
  cards.forEach((card) => {
    if (card.getAttribute("data-room") === roomName) {
      card.classList.add("selected-card");
    } else {
      card.classList.remove("selected-card");
    }
  });

  // Smooth scroll to the step cards below
  const bookingSection = document.querySelector("#bookingSection");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Open details modal
function openRoomDetails(roomName) {
  const data = roomDetailsData[roomName];
  if (!data) return;

  document.querySelector("#detailModalImg").src = data.image;
  document.querySelector("#detailModalTitle").innerText = roomName;
  document.querySelector("#detailModalMeta").innerText = data.meta;
  document.querySelector("#detailModalDesc").innerText = data.story;

  const highlightsList = document.querySelector("#detailModalHighlights");
  highlightsList.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join("");

  const bookBtn = document.querySelector("#modalBookNowBtn");
  bookBtn.onclick = () => {
    closeDetailsModal();
    chooseRoom(roomName);
  };

  document.querySelector("#detailsModal").style.display = "flex";
}

function closeDetailsModal() {
  const modal = document.querySelector("#detailsModal");
  if (modal) modal.style.display = "none";
}

function closeSuccessModal() {
  const successModal = document.querySelector("#successModal");
  const bookingForm = document.querySelector("#bookingForm");
  const totalPrice = document.querySelector("#totalPrice");
  const cards = document.querySelectorAll(".room-card");
  const roomSelectDisplay = document.querySelector("#selectedRoomDisplay");
  const roomSelectInput = document.querySelector("#roomSelect");

  if (successModal) successModal.style.display = "none";
  if (bookingForm) bookingForm.reset();
  if (totalPrice) totalPrice.textContent = "€64";
  if (roomSelectDisplay) roomSelectDisplay.value = "Please click a room card above...";
  if (roomSelectInput) roomSelectInput.value = "";

  cards.forEach((card) => card.classList.remove("selected-card"));
}