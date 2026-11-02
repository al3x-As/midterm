document.addEventListener("DOMContentLoaded", () => {
  //store the elements
  const form = document.querySelector("#contactForm");
  const modal = document.querySelector("#confirmationModal");
  const closeBtn = document.querySelector(".close-btn");
  const modalCloseBtn = document.querySelector("#modalCloseBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //stop from refreshing the page and navigation when submitting

    if (validateForm()) {
      // Collect user input values
      const name = document.querySelector("#name").value.trim(); //read text, renove spaces form start or end
      const email = document.querySelector("#email").value.trim();
      const subject = document.querySelector("#subject").value.trim();
      const message = document.querySelector("#message").value.trim();

      // Copies the inserted values in the pop-up textbox
      document.querySelector("#confirmName").textContent = name;
      document.querySelector("#confirmEmail").textContent = email;
      document.querySelector("#confirmSubject").textContent = subject;
      document.querySelector("#confirmMessage").textContent = message;

      // Open the pop-up textbox
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
    if (e.target === modal) closeModal(); //click outside the textbox
  });

  function closeModal() {
    modal.style.display = "none";
  }

  // Field Validation Function
  function validateForm() {
    let isValid = true;
    clearErrors();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const subject = document.querySelector("#subject");
    const message = document.querySelector("#message");

    // Validate Name
    if (name.value.trim() === "") {
      setError(name, "#nameError", "Name is required.");
      isValid = false;
    }

    // Validate Email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      setError(email, "#emailError", "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, "#emailError", "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Subject
    if (subject.value.trim() === "") {
      setError(subject, "#subjectError", "Subject is required.");
      isValid = false;
    }

    // Validate Message (Min length 10 characters)
    if (message.value.trim() === "") {
      setError(message, "#messageError", "Message is required.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      setError(message, "#messageError", "Message must be at least 10 characters.");
      isValid = false;
    }

    return isValid;
  }

  //display and clear error messages
  function setError(inputElement, errorSelector, message) {
    const errorSpan = document.querySelector(errorSelector); //find the specific <span> reserved for showing the error text
    errorSpan.textContent = message; //add the warning text inside <span> element
    inputElement.parentElement.classList.add("error"); //add the "error" css
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((span) => (span.textContent = ""));  //Find every error text span and make its text empty
    document.querySelectorAll(".form-group").forEach((group) => group.classList.remove("error")); //Find every form container group and remove the "error" class
  }
});