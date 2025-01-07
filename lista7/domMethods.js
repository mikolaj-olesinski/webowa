// 1.	Zademonstrować działanie metod JavaScript: createElement, createTextNode, appendChild, 
// insertBefore, replaceChild, removeChild oraz właściwości parentNode 
// (wstawić do listy element numerowany, np. element 1, element 2…).

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("attractions-list");

    list.removeChild(list.lastElementChild);

    const newItem = document.createElement("li");
    const newText = document.createTextNode("Element numer 1");
    newItem.appendChild(newText);
    list.appendChild(newItem);

    const anotherItem = document.createElement("li");
    anotherItem.textContent = "Element numer 2";
    list.insertBefore(anotherItem, list.firstElementChild);


    const replacementItem = document.createElement("li"); 
    replacementItem.textContent = "Zamieniony element"; 
    list.replaceChild(replacementItem, list.children[1]);


    const parent = list.parentNode;
    console.log("Rodzic listy to:", parent.tagName);
});
