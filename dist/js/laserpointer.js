"use strict";
// Import the WebSocket and DeviceMotionEvent interfaces
// import io from 'socket.io-client';
//
// // Connect to the Socket.IO server
// const socket = io('http://localhost:3000');
//
// socket.on('connect', () => {
//   console.log('Connected to Socket.io server');
// });
// Set the initial position of the laser pointer to the center of the screen
let xPos = window.innerWidth / 2;
let yPos = window.innerHeight / 2;
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    // @ts-ignore
    window.DeviceMotionEvent.requestPermission()
        .then((res) => {
        alert(res);
        const laser = createLaser();
        useDeviceMotionEvent(laser);
    });
    startButton.remove();
});
function createLaser() {
    // Create a new HTML element to represent the laser pointer
    const laser = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xPos}px`;
    laser.style.top = `${yPos}px`;
    laser.style.width = "5px";
    laser.style.height = "5px";
    laser.style.backgroundColor = "red";
    // Add the laser pointer to the document
    document.body.appendChild(laser);
    return laser;
}
// Listen for device motion events and update the laser pointer's position
function useDeviceMotionEvent(laser) {
    window.addEventListener("devicemotion", (event) => {
        var _a, _b;
        alert(event);
        // Update the laser pointer's position based on the device's acceleration
        if (((_a = event.acceleration) === null || _a === void 0 ? void 0 : _a.x) != null && ((_b = event.acceleration) === null || _b === void 0 ? void 0 : _b.y) != null) {
            xPos += event.acceleration.x;
            yPos += event.acceleration.y;
        }
        // Ensure the laser pointer doesn't go off the screen
        xPos = Math.max(0, Math.min(xPos, window.innerWidth));
        yPos = Math.max(0, Math.min(yPos, window.innerHeight));
        // Update the laser pointer's position on the screen
        laser.style.left = `${xPos}px`;
        laser.style.top = `${yPos}px`;
        // Send the laser pointer's position to the server
        // socket.send(
        //     JSON.stringify({
        //         xPos,
        //         yPos,
        //     })
        // );
    });
}
