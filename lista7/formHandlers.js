// 5.	W formularzach wykorzystać zdarzenia focus i blur do wyświetlania tekstów pomocy oraz zdarzenia submit i reset do wyzwalania okien potwierdzających.

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[list]");
    const spans = form.querySelectorAll("span");
  
    inputs.forEach((input, index) => {
      input.addEventListener("focus", () => {
        spans[index].style.display = "inline";
      });
  
      input.addEventListener("blur", () => {
        spans[index].style.display = "none";
      });
    });
  
    form.addEventListener("submit", (event) => {
      const confirmation = confirm("Czy na pewno chcesz wysłać formularz?");
      if (!confirmation) {
        event.preventDefault(); 
      }
    });
  

    form.addEventListener("reset", (event) => {
      const confirmation = confirm("Czy na pewno chcesz wyczyścić wszystkie dane?");
      if (!confirmation) {
        event.preventDefault();
      }
    });
  });