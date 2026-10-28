document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior for anchor buttons if needed
  const ctaButtons = document.querySelectorAll(".cta-btn");

  ctaButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.style.transform = "scale(0.98)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 150);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Fetch a quote automatically when the page loads
  fetchMotivationalQuote();
});

// Fetch random quote from DummyJSON Public API
async function fetchMotivationalQuote() {
  const quoteText = document.querySelector("#quoteText");
  const quoteAuthor = document.querySelector("#quoteAuthor");
  const btn = document.querySelector("#newQuoteBtn");

  if (!quoteText || !quoteAuthor) return;

  try {
    // Show loading state
    quoteText.textContent = "Fetching fresh inspiration...";
    if (btn) btn.disabled = true;

    // Call Public API
    const response = await fetch("https://dummyjson.com/quotes/random");
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Dynamically update HTML elements with API data
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    // Fallback quote in case user is offline
    quoteText.textContent = '"Escape rooms test your mind, but teamwork unlocks the door."';
    quoteAuthor.textContent = '- LockBox Team';
  } finally {
    if (btn) btn.disabled = false;
  }
}