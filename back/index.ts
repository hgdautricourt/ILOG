import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8080;

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

app.get('/api/slides', (req: Request, res: Response) => {
    res.sendFile('./slides.html', { root: "public" });
})

app.get('/api/laserpointer', (req: Request, res: Response) => {
    res.sendFile('./laserpointer.html', { root: "public" });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app