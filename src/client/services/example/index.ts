import dgram from 'dgram';

const client = dgram.createSocket('udp4');
const serverAddress = '127.0.0.1';
const serverPort = 20001;

const operation = {
  value1: 1,
  value2: 2,
  operator: '+'
};

const msgFromClient = JSON.stringify(operation);
const bytesToSend = Buffer.from(msgFromClient);

client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err: any) => {
  if (err) {
    throw err;
  }
  console.log('Mensagem enviada para o servidor');

  client.on('message', (msgFromServer: string) => {
    const msg = `Mensagem vinda do Servidor ${msgFromServer}`;
    console.log(msg);
    client.close();
  });
});
