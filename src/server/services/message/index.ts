import dgram from 'dgram';

const message = (data: string, remoteInfo: dgram.RemoteInfo) => {
  console.log(`Message <${data}> from ${remoteInfo.address}:${remoteInfo.port}`);
  return 'Mensagem respondida';
};

export default message;
