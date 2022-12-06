import io from 'socket.io-client';
const socket = io('https://api.quizeo.com', { transports: ['websocket'] });
socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});
const pointerSize = 15;
const xCenter = window.innerWidth / 2;
const yCenter = window.innerHeight / 2;
const laser = createLaser();
socket.on('slides.update', (data) => {
    moveLaser(laser, data.x, data.y);
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
    laser.style.boxShadow = "0px 0px 16px 6px rgba(255,0,0,1)";
    document.body.appendChild(laser);
    return laser;
}
function moveLaser(laserPointer, x, y) {
    requestAnimationFrame(() => {
        const { left, top } = laserPointer.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(left + x, window.innerWidth - pointerSize));
        const newTop = Math.max(0, Math.min(top + y, window.innerHeight - pointerSize));
        laserPointer.style.left = `${newLeft}px`;
        laserPointer.style.top = `${newTop}px`;
    });
}
