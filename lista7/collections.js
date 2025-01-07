// 2.	Zademonstrować działanie kolekcji: images, links, forms, anchors oraz metod item i namedItem.

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Images collection:", document.images);
    console.log("Links collection:", document.links);
    console.log("Forms collection:", document.forms);
    console.log("Anchors collection:", document.anchors);

    console.log("First image:", document.images.item(0));
    console.log("Named anchor:", document.anchors.namedItem("named-anchor"));
  });