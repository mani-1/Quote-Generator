// DOM Selector
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];

// Get Random Quotes
function randomQuotes() {
  loading();
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (randomQuote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = randomQuote.text;
  authorText.innerText = randomQuote.author ? randomQuote.author : "Unknown";
  complete();
}

//--*-- Get quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    randomQuotes();
  } catch (err) {
    alert(err);
  }
}

function tweetQuotes() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetURL, "_blank");
}

// On click listner
newQuoteBtn.addEventListener("click", randomQuotes);
twitterBtn.addEventListener("click", tweetQuotes);

getQuotes();
