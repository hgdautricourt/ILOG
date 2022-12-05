"use strict";
const pointerSize = 15;
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
                moveLaserPointer(laser, x ?? 0, -(y ?? 0));
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
    laser.style.width = `${pointerSize}px`;
    laser.style.height = `${pointerSize}px`;
    laser.style.backgroundColor = "red";
    laser.style.borderRadius = "100%";
    laser.style.boxShadow = "0px 0px 150px 8px rgba(255,46,46,1)";
    document.body.appendChild(laser);
    return laser;
}
function moveLaserPointer(laserPointer, x, y) {
    requestAnimationFrame(() => {
        const { left, top } = laserPointer.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(left + x, window.innerWidth - pointerSize));
        const newTop = Math.max(0, Math.min(top + y, window.innerHeight - pointerSize));
        laserPointer.style.left = `${newLeft}px`;
        laserPointer.style.top = `${newTop}px`;
    });
}
