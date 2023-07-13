import dgram from 'dgram';
import createBufferControl from 'server/lib/Buffer';
import FileOperator from 'shared/lib/FileOperator';

const storagePath = 'src/server/storage';
const buffer = createBufferControl();

const buildFile = (): void => {
  console.log('Arquivo recebido por completo');
  FileOperator.createFileByInput('file.txt', buffer.getBuffer().join(''), storagePath);

  // TODO: Implementar um sistema de verificação de integridade do arquivo
  // TODO: Implementar funções com Promise para evitar o uso de setTimeout

  setTimeout(() => {
    buffer.clearBuffer();
  }, 1000);
};

const file = (data: IRequest, remoteInfo: dgram.RemoteInfo) => {
  console.log(`File ${data.header.ack} of ${data.header.seq} received from ${remoteInfo.address}:${remoteInfo.port}`);

  buffer.addBuffer(data.body);

  if (buffer.getLength() === data.header.seq) {
    buildFile();
    return 'File received';
  }

  return buffer.getLength();
};

export default file;
