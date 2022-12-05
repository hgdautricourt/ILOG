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
const io = new socket_io_1.Server();
io.on('connect', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
app.use(express_useragent_1.default.express());
app.get('/api', (req, res) => {
    const path = `/api/item/toto}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});
app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});
app.get('/api/slides', (req, res) => {
    res.sendFile('./slides.html', { root: "public" });
});
app.get('/api/laserpointer', (req, res) => {
    res.sendFile('./laserpointer.html', { root: "public" });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;