const POINTER_SIZE = 40
const TARGET_SIZE = POINTER_SIZE*10


const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;

export function createLaser(): HTMLSpanElement {
    // Create a new HTML element to represent the laser pointer
    const laser: HTMLSpanElement = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xCenter-POINTER_SIZE}px`;
    laser.style.top = `${yCenter-POINTER_SIZE}px`;
    laser.style.width = `${POINTER_SIZE}px`;
    laser.style.height = `${POINTER_SIZE}px`;
    laser.style.backgroundColor = "red";
    laser.style.borderRadius= "100%";
    laser.style.boxShadow = "0px 0px 12px 3px rgba(255,0,0,0.8)";

    // Add the laser pointer to the document
    document.body.appendChild(laser);

    return laser
}

export function moveLaser(laserPointer: HTMLSpanElement, x: number, y: number) {
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

export function moveLaserPointer(laserPointer: HTMLSpanElement, x: number, y: number) {
    // Get the current position of the laser pointer
    requestAnimationFrame(() => {
        
        // round x and y to 1 decimal places
        x = Math.round( x * 10) / 10;
        y = Math.round(y * 10) / 10;

        // Update the position of the laser pointer on the screen
        laserPointer.style.left = `${xCenter + x * 10}px`;
        laserPointer.style.top = `${yCenter + y * 10}px`;
    })
}