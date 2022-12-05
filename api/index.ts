import express, { Express, Request, Response } from 'express';
import { Server } from "socket.io";
import userAgent from 'express-useragent';
import dotenv from 'dotenv';

const app: Express = express();
const port = 8080;

// Initialize dotenv
dotenv.config();

const socketPort = Number(process.env.SOCKET_SERVER_PORT);

const io = new Server();

io.on('connect', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(userAgent.express());

app.get('/', (req: Request, res: Response) => {
    res.sendFile(req.useragent?.isMobile ? './laserpointer.html' : './slides.html', { root: "public" });
})

app.get('/slides', (req: Request, res: Response) => {
    res.sendFile('./slides.html', { root: "public" });
})

app.get('/laserpointer', (req: Request, res: Response) => {
    res.sendFile('./laserpointer.html', { root: "public" });
})

// app.use(express.static("dist/public"));


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app