"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const express_useragent_1 = __importDefault(require("express-useragent"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = 8080;
// Initialize dotenv
dotenv_1.default.config();
const socketPort = Number(process.env.SOCKET_SERVER_PORT);
const io = new socket_io_1.Server();
io.on('connect', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
app.use(express_useragent_1.default.express());
app.get('/', (req, res) => {
    var _a;
    res.sendFile(((_a = req.useragent) === null || _a === void 0 ? void 0 : _a.isMobile) ? './laserpointer.html' : './slides.html', { root: "public" });
});
app.get('/slides', (req, res) => {
    res.sendFile('./slides.html', { root: "public" });
});
app.get('/laserpointer', (req, res) => {
    res.sendFile('./laserpointer.html', { root: "public" });
});
app.use(express_1.default.static("dist"));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
