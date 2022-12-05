"use strict";
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    window.DeviceMotionEvent.requestPermission()
        .then((res) => {
        if (res === 'granted') {
            const laser = createLaser();
            const debugX = document.getElementById('debug-x');
            const debugY = document.getElementById('debug-y');
            window.addEventListener('devicemotion', (e) => {
                const { x, y } = e.acceleration;
                debugX.innerHTML = String(x);
                debugY.innerText = String(y);
                moveLaserPointer(laser, x ?? 0, y ?? 0);
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
    laser.style.width = "15px";
    laser.style.height = "15px";
    laser.style.backgroundColor = "red";
    document.body.appendChild(laser);
    return laser;
}
function moveLaserPointer(laserPointer, x, y) {
    const { left, top } = laserPointer.getBoundingClientRect();
    const newLeft = left + x;
    const newTop = top + y;
    laserPointer.style.left = `${newLeft}px`;
    laserPointer.style.top = `${newTop}px`;
}
