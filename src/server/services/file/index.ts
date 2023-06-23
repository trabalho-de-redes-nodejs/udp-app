import dgram from 'dgram';

const file = (data: IRequest, remoteInfo: dgram.RemoteInfo) => {
  console.log(`File ${data.header.partNumber} of ${data.header.totalParts} received from ${remoteInfo.address}:${remoteInfo.port}`);
  return 'Arquivo respondido';
};

export default file;
