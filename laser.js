// Import the WebSocket and DeviceMotionEvent interfaces
import WebSocket from "ws";

// Set the initial position of the laser pointer to the center of the screen
let xPos = window.innerWidth / 2;
let yPos = window.innerHeight / 2;

// Create a new HTML element to represent the laser pointer
const laser = document.createElement("div");
laser.style.position = "absolute";
laser.style.left = `${xPos}px`;
laser.style.top = `${yPos}px`;
laser.style.width = "5px";
laser.style.height = "5px";
laser.style.backgroundColor = "red";

// Add the laser pointer to the document
document.body.appendChild(laser);

// Connect to the WebSocket server
const socket = new WebSocket("ws://localhost:8080");

// Listen for device motion events and update the laser pointer's position
window.addEventListener("devicemotion", (event) => {
    // Update the laser pointer's position based on the device's acceleration
    xPos += event.acceleration.x;
    yPos += event.acceleration.y;

    // Ensure the laser pointer doesn't go off the screen
    xPos = Math.max(0, Math.min(xPos, window.innerWidth));
    yPos = Math.max(0, Math.min(yPos, window.innerHeight));

    // Update the laser pointer's position on the screen
    laser.style.left = `${xPos}px`;
    laser.style.top = `${yPos}px`;

    // Send the laser pointer's position to the server
    socket.send(
        JSON.stringify({
            xPos,
            yPos,
        })
    );
});