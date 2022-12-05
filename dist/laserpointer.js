"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the WebSocket and DeviceMotionEvent interfaces
const socket_io_client_1 = __importDefault(require("socket.io-client"));
// Connect to the Socket.IO server
const socket = (0, socket_io_client_1.default)('http://localhost:3000');
socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});
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
// Listen for device motion events and update the laser pointer's position
window.addEventListener("devicemotion", (event) => {
    var _a, _b;
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
    socket.send(JSON.stringify({
        xPos,
        yPos,
    }));
});
