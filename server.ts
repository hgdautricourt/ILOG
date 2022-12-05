import WebSocket from "ws";

// Create a new WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Listen for incoming connections
server.on("connection", (socket) => {
    // Listen for messages from the laser pointer
    socket.on("message", (message) => {
        // Parse the message as JSON
        const data = JSON.parse(message);

        // Get the canvas element
        const canvas = document.getElementById("laser-canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d");

        // Draw the laser pointer on the canvas
        context.beginPath();
        context.arc(data.xPos, data.yPos, 5, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
    });
});