document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("confirmationModal");
  const closeBtn = document.querySelector(".close-btn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Collect field values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Populate Modal Popup
      document.getElementById("confirmName").textContent = name;
      document.getElementById("confirmEmail").textContent = email;
      document.getElementById("confirmSubject").textContent = subject;
      document.getElementById("confirmMessage").textContent = message;

      // Display Modal Popup
      modal.style.display = "flex";

      // Reset form
      form.reset();
      clearErrors();
    }
  });

  // Modal Closing Triggers
  closeBtn.addEventListener("click", closeModal);
  modalCloseBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
  }

  // Field Validation Function
  function validateForm() {
    let isValid = true;
    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    // Validate Name
    if (name.value.trim() === "") {
      setError(name, "nameError", "Name is required.");
      isValid = false;
    }

    // Validate Email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      setError(email, "emailError", "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, "emailError", "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Subject
    if (subject.value.trim() === "") {
      setError(subject, "subjectError", "Subject is required.");
      isValid = false;
    }

    // Validate Message (Min length 10 characters)
    if (message.value.trim() === "") {
      setError(message, "messageError", "Message is required.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      setError(message, "messageError", "Message must be at least 10 characters.");
      isValid = false;
    }

    return isValid;
  }

  function setError(inputElement, errorId, message) {
    const errorSpan = document.getElementById(errorId);
    errorSpan.textContent = message;
    inputElement.parentElement.classList.add("error");
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((span) => (span.textContent = ""));
    document.querySelectorAll(".form-group").forEach((group) => group.classList.remove("error"));
  }
});