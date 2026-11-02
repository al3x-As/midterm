document.addEventListener("DOMContentLoaded", () => {
  // Fetch a quote automatically when the page loads
  fetchMotivationalQuote();
});

// Fetch random quote from DummyJSON Public API
async function fetchMotivationalQuote() {
  const quoteText = document.querySelector("#quoteText");
  const quoteAuthor = document.querySelector("#quoteAuthor");
  const btn = document.querySelector("#newQuoteBtn");

  if (!quoteText || !quoteAuthor) return; //check if they exist, if not stop running

  try {
    // Show loading state
    quoteText.textContent = "Fetching fresh inspiration...";
    if (btn) btn.disabled = true;

    // Call Public API
    const response = await fetch("https://dummyjson.com/quotes/random");
    
    if (!response.ok) {  // Checks if the server sent a failed status code
      throw new Error(`API error: ${response.status}`); //stop and jump to catch
    }

    const data = await response.json(); // covert the servers response to js object

    // Dynamically update HTML elements with API data
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `- ${data.author}`;
  } 
  
  catch (error) {
    console.error("Failed to fetch quote:", error);
    // Fallback quote in case user is offline
    quoteText.textContent = '"Escape rooms test your mind, but teamwork unlocks the door."';
    quoteAuthor.textContent = '-LockBox Team';
  } 
  
  finally {
    if (btn) btn.disabled = false; // re-enables the button
  }
}