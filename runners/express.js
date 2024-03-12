import app from '../../app.js';
import { createServer } from 'node:http';

const server = createServer(app);
const port = 4000;

server.listen(port);
server.on('error', (err) => {
    console.log('ERR:', err)
});
server.on('listening', () => {
    console.log(`listen http server ${port}`);
});
