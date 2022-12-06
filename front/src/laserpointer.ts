// Import the WebSocket and DeviceMotionEvent interfaces
import io from 'socket.io-client';

// Set the initial position of the laser pointer to the center of the screen
const POINTER_SIZE = 15
const MULTIPLIER = 2.5
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;

const startButton = document.getElementById('start')!!
startButton.addEventListener('click', () => {
    // @ts-ignore
    window.DeviceMotionEvent.requestPermission()
        .then((res: NotificationPermission) => {
            if (res === 'granted') {
                const laser = createLaser()
                const socket = io('https://api.quizeo.com', {transports: ['websocket']});

                socket.on('connect', () => console.log('Connected to Socket.io server'));
                socket.on('connect_error', (err) => alert(err))

                window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
                    const {x, y} = e.accelerationIncludingGravity!!;

                    socket.emit('laser.update', {x, y: -(y ?? 0)})
                    moveLaserPointer(laser, MULTIPLIER * (x ?? 0), MULTIPLIER * -(y ?? 0))
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
    laser.style.width = `${POINTER_SIZE}px`;
    laser.style.height = `${POINTER_SIZE}px`;
    laser.style.backgroundColor = "red";
    laser.style.borderRadius = "100%";
    laser.style.boxShadow = "0px 0px 150px 8px rgba(255,0,0,1)";

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
        const newLeft = Math.max(0, Math.min(left + x, window.innerWidth - POINTER_SIZE));
        const newTop = Math.max(0, Math.min(top + y, window.innerHeight - POINTER_SIZE));

        // Update the position of the laser pointer on the screen
        laserPointer.style.left = `${newLeft}px`;
        laserPointer.style.top = `${newTop}px`;
    })
}