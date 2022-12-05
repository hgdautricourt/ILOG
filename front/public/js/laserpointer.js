"use strict";
let xPos = window.innerWidth / 2;
let yPos = window.innerHeight / 2;
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    window.DeviceMotionEvent.requestPermission()
        .then((res) => {
        alert(res);
        const laser = createLaser();
        useDeviceMotionEvent(laser);
    });
    startButton.remove();
});
function createLaser() {
    const laser = document.createElement("span");
    laser.style.position = "absolute";
    laser.style.left = `${xPos}px`;
    laser.style.top = `${yPos}px`;
    laser.style.width = "5px";
    laser.style.height = "5px";
    laser.style.backgroundColor = "red";
    document.body.appendChild(laser);
    return laser;
}
function useDeviceMotionEvent(laser) {
    window.addEventListener("devicemotion", (event) => {
        if (event.acceleration?.x != null && event.acceleration?.y != null) {
            xPos += event.acceleration.x;
            yPos += event.acceleration.y;
        }
        xPos = Math.max(0, Math.min(xPos, window.innerWidth));
        yPos = Math.max(0, Math.min(yPos, window.innerHeight));
        laser.style.left = `${xPos}px`;
        laser.style.top = `${yPos}px`;
    });
}
