import dgram from 'dgram';
import FileOperator from 'shared/lib/FileOperator';

const storagePath = 'src/server/storage';
const buffer: string[] = [];

const insertOnBuffer = (data: any): void => {
  buffer.push(`${data}`);
};

const cleanBuffer = (): void => {
  while (buffer.length > 0) {
    buffer.pop();
  }
};

const buildFile = (): void => {
  console.log('Arquivo recebido por completo');
  FileOperator.createFileByInput('file.txt', buffer.join(''), storagePath);

  // TODO: Implementar um sistema de verificação de integridade do arquivo
  // TODO: Implementar funções com Promise para evitar o uso de setTimeout

  setTimeout(() => {
    cleanBuffer();
  }, 1000);
};

const file = (data: IRequest, remoteInfo: dgram.RemoteInfo) => {
  console.log(`File ${data.header.partNumber} of ${data.header.totalParts} received from ${remoteInfo.address}:${remoteInfo.port}`);

  insertOnBuffer(data.body);

  if (buffer.length === data.header.totalParts) {
    buildFile();
    return 'File received';
  }

  return buffer.length;
};

export default file;
