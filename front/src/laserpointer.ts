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
const pointerSize = 15
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;

const startButton = document.getElementById('start')!!
startButton.addEventListener('click', () => {
    // @ts-ignore
    window.DeviceMotionEvent.requestPermission()
        .then((res: NotificationPermission) => {
            if (res === 'granted') {
                const laser = createLaser()
                const debugX = document.getElementById('debug-x')!!
                const debugY = document.getElementById('debug-y')!!

                window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
                    const { x, y } = e.accelerationIncludingGravity!!;

                    debugX.innerHTML = String(`X: ${x?.toFixed(3)}`)
                    debugY.innerHTML = String(`Y: ${y?.toFixed(3)}`)

                    moveLaserPointer(laser, x ?? 0, -(y ?? 0))
                })

                startButton.remove()
            }
        })
})

function createLaser(): HTMLSpanElement {
    // Create a new HTML element to represent the laser pointer
    const laser: HTMLSpanElement = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xCenter}px`;
    laser.style.top = `${yCenter}px`;
    laser.style.width = `${pointerSize}px`;
    laser.style.height = `${pointerSize}px`;
    laser.style.backgroundColor = "red";

    // Add the laser pointer to the document
    document.body.appendChild(laser);

    return laser
}

// Listen for device motion events and update the laser pointer's position
function moveLaserPointer(laserPointer: HTMLSpanElement, x: number, y: number) {
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