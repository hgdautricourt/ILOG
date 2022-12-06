// Description: This file contains the code for the slides

// Import the socket.io client library
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('https://api.quizeo.com', { transports: ['websocket']});

// Listen for a connection event
socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});


// Set the initial position of the laser pointer to the center of the screen
const pointerSize = 10
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;
const laser = createLaser()

// Listen for a pointer.update event from the server
socket.on('slides.update', (data: { x: number, y: number }) => {
    // Update the position of the laser pointer on the screen
    moveLaser(laser, data.x, data.y)
});

function createLaser(): HTMLSpanElement {
    // Create a new HTML element to represent the laser pointer
    const laser: HTMLSpanElement = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xCenter}px`;
    laser.style.top = `${yCenter}px`;
    laser.style.width = `${pointerSize}px`;
    laser.style.height = `${pointerSize}px`;
    laser.style.backgroundColor = "red";
    laser.style.borderRadius= "100%";
    laser.style.boxShadow = "0px 0px 12px 3px rgba(255,0,0,0.8)";

    // Add the laser pointer to the document
    document.body.appendChild(laser);

    return laser
}

// Listen for device motion events and update the laser pointer's position
function moveLaser(laserPointer: HTMLSpanElement, x: number, y: number) {
    // Get the current position of the laser pointer
    requestAnimationFrame(() => {
        const {left, top} = laserPointer.getBoundingClientRect();

        // Calculate the new position of the laser pointer using the acceleration values
        const newLeft = Math.max(0, Math.min(left + x, window.innerWidth - pointerSize));
        const newTop = Math.max(0, Math.min(top + y, window.innerHeight - pointerSize));

        // Update the position of the laser pointer on the screen
        laserPointer.style.left = `${newLeft}px`;
        laserPointer.style.top = `${newTop}px`;
    })
}

