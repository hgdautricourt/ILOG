import io from 'socket.io-client';
import {createLaser, moveLaser} from "./utils/laser";

const socket = io('https://api.quizeo.com', { transports: ['websocket']});
let laser: HTMLSpanElement

socket.on('connect', () => {
    laser = createLaser()
});

socket.on('slides.update', ({ x, y }: { x: number, y: number }) => {
    // Update the position of the laser pointer on the screen
    moveLaser(laser, x, y)
});