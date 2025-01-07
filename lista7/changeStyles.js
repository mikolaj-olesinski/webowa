//3.	Umożliwić użytkownikowi zmianę na żądanie stylów CSS: koloru tła, koloru tekstu, rodzaju czcionki (z listy).

"use strict";

function changeStyles() {
    const body = document.body;
    body.style.backgroundColor = "lightblue";
    body.style.color = "darkred";
    body.style.fontFamily = "Arial; sans-serif";
  }


document.getElementById("changeButton").addEventListener("click", () => {
  changeStyles();
});

document.addEventListener("DOMContentLoaded", () => {
  const fontSelector = document.getElementById("fontSelector");

  fontSelector.addEventListener("change", (event) => {
      const selectedFont = event.target.value;
      document.body.style.fontFamily = selectedFont;
  });
});
