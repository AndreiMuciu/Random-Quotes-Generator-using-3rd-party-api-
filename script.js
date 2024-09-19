"use strict";

const apiURL = "https://api.api-ninjas.com/v1/quotes";
const apiKEY = "xlLVC2C5Z3JotX2qxPGSsg==RBFL9kkBENZbFFew";

const displayQuoteBtn = document.querySelector("#new-quote");
const selectedCategory = document.querySelector("#category");
const authorPlace = document.querySelector(".author-text");
const quotePlace = document.querySelector(".quote-text");

const fetchQuote = async function (url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const [data] = await response.json();
    return data;
  } catch (err) {
    console.error(`We have an error: ${err.message}`);
    alert(`We have an error: ${err.message}`);
  }
};

const displayQuote = async function (e) {
  const category = selectedCategory.value;
  if (category === "not-selected") {
    const data = await fetchQuote(apiURL);
    quotePlace.textContent = data.quote;
    authorPlace.textContent = data.author;
    return;
  }
  const url = apiURL + `/${category}`;
  const data = await fetchQuote(apiURL);
  quotePlace.textContent = data.quote;
  authorPlace.textContent = data.author;
};

displayQuoteBtn.addEventListener("click", displayQuote);
