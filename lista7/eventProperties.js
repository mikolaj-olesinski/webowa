
// 4.	Zademonstrować możliwości właściwości altKey, ctrlKey, shiftKey, keyCode, clientX, clientY, screenX, screenY obiektu event.
// Wykorzystać zdarzenia: mousemove, mousedown, mouseover, mouseout.

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const testArea = document.getElementById("event-test-area");
  
    testArea.addEventListener("mousemove", (event) => {
      console.log(`Mouse Move -> ClientX: ${event.clientX}, ClientY: ${event.clientY}`);
      console.log(`Mouse Move -> ScreenX: ${event.screenX}, ScreenY: ${event.screenY}`);
      console.log(`Modifier Keys -> Alt: ${event.altKey}, Ctrl: ${event.ctrlKey}, Shift: ${event.shiftKey}`);
    });
  
    testArea.addEventListener("mousedown", (event) => console.log("Mouse Button Pressed:", event.button));
    testArea.addEventListener("mouseover", () => console.log("Mouse Entered the area"));
    testArea.addEventListener("mouseout", () => console.log("Mouse Left the area"));
  
    document.addEventListener("keydown", (event) => {
      console.log(`Key Pressed -> KeyCode: ${event.keyCode}, Key: ${event.key}`);
      console.log(`Modifier Keys -> Alt: ${event.altKey}, Ctrl: ${event.ctrlKey}, Shift: ${event.shiftKey}`);
    });
  
    document.addEventListener("keyup", (event) => {
      console.log(`Key Released -> KeyCode: ${event.keyCode}, Key: ${event.key}`);
    });
  });
