"use strict";
const POINTER_SIZE = 15;
const MULTIPLIER = 2.5;
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    window.DeviceMotionEvent.requestPermission()
        .then((res) => {
        if (res === 'granted') {
            const laser = createLaser();
            window.addEventListener('devicemotion', (e) => {
                const { x, y } = e.accelerationIncludingGravity;
                moveLaserPointer(laser, MULTIPLIER * (x ?? 0), MULTIPLIER * -(y ?? 0));
            });
            startButton.remove();
        }
    });
});
function createLaser() {
    const laser = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xCenter}px`;
    laser.style.top = `${yCenter}px`;
    laser.style.width = `${POINTER_SIZE}px`;
    laser.style.height = `${POINTER_SIZE}px`;
    laser.style.backgroundColor = "red";
    laser.style.borderRadius = "100%";
    laser.style.boxShadow = "0px 0px 150px 8px rgba(255,0,0,1)";
    document.body.appendChild(laser);
    return laser;
}
function moveLaserPointer(laserPointer, x, y) {
    requestAnimationFrame(() => {
        const { left, top } = laserPointer.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(left + x, window.innerWidth - POINTER_SIZE));
        const newTop = Math.max(0, Math.min(top + y, window.innerHeight - POINTER_SIZE));
        laserPointer.style.left = `${newLeft}px`;
        laserPointer.style.top = `${newTop}px`;
    });
}
