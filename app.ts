import * as path from 'path';
import * as dotenv from "dotenv";
import Server from './models/server';

dotenv.config({
    path: path.join(__dirname, `env${path.sep}.env.${process.env.NODE_ENV}`)
});

const server = new Server();

server.listen();
