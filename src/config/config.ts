import dotenv from 'dotenv';

dotenv.config();

const serverAddress: string = process.env.ADDRESS || '127.0.0.1';
const serverPort = typeof process.env.PORT === 'string' ? parseInt(process.env.PORT) : process.env.PORT;
const bufferSize = 1024;

export { serverAddress, serverPort, bufferSize };
