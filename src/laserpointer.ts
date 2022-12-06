import io from 'socket.io-client';
import {createLaser,createTarget, moveLaser, moveLaserPointer} from "./utils/laser";

const MOVEMENT_MULTIPLIER = 2.5
const startButton = document.getElementById('start')!!
startButton.addEventListener('click', () => {
    // @ts-ignore
    window.DeviceMotionEvent.requestPermission()
        .then((res: NotificationPermission) => {
            if (res === 'granted') {
                const laser = createLaser()
                const target = createTarget()
                const socket = io('https://api.quizeo.com', {transports: ['websocket']});

                socket.on('connect', () => console.log('Connected to Socket.io server'));
                socket.on('connect_error', (err) => alert(err))

                window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
                    const {x, y} = e.accelerationIncludingGravity!!;

                    socket.emit('laser.update', {x, y: -(y ?? 0)})
                    moveLaserPointer(laser, MOVEMENT_MULTIPLIER * (x ?? 0), MOVEMENT_MULTIPLIER * -(y ?? 0))
                })

                startButton.remove()
            }
        })
})