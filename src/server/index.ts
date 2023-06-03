import dgram from 'dgram';
import dotenv from 'dotenv';

dotenv.config();
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

socket.bind(process.env.API_PORT);
console.log(`Server listening on ${process.env.API_PORT}`);
