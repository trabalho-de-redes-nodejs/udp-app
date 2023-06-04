const serverAddress: string = process.env.ADDRESS || '127.0.0.1';
const serverPort = parseInt(typeof process.env.PORT === 'string' ? process.env.PORT : '20001') || 20001;
const bufferSize = 1024;

export { serverAddress, serverPort, bufferSize };
