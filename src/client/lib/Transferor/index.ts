import { Socket } from 'dgram';
import fs from 'fs';
import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import FileSplitter from 'shared/lib/FileSplitter';

interface ITransferor {
  send(): Promise<void>;
}

const Transferor = (pipeline: PipelineControl, clientSocket: Socket): ITransferor => {
  const buffer: PipelineControl = pipeline;
  const client = clientSocket;
  const ack = 0;
  const seq = 0;
  const windowSize = pipeline.getLength();
  const maximumSegmentSize = 1024;
  const server = {
    ack: 0,
    seq: 0,
  };

  const send = async (): Promise<void> => {
    await establishConnection();
    // await unpackPipeline();
  };

  const establishConnection = async (): Promise<void> => {
    const firstWay: IRequest = Protocoler.buildRequestObject(seq, ack, '', 'SYN');

    await Requester.request(client, firstWay)
      .then((response: string) => {
        const responseJSON: IResponse = JSON.parse(response);

        server.seq = responseJSON.header.seq;
        server.ack = responseJSON.header.ack;

        console.log('First Way');
        console.log('Seq Cliente: ', seq);
        console.log('Ack Cliente: ', ack);
        console.log('Seq Servidor: ', server.seq);
        console.log('Ack Servidor: ', server.ack);
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  };

  const unpackPipeline = async (): Promise<void> => {
    await sendFileToServerByParts(client)
      .catch((err) => console.error(err))
      .finally(() => {
        client.close();
        FileSplitter.deleteFilesFromArray(pipeline.getPipeline());
      });
  };

  const sendFileToServerByParts = async (): Promise<void> => {
    const seq = pipeline.getLength();

    for (let partIndex = 1; partIndex <= seq; partIndex++) {
      const partName = pipeline.getPipeline()[0];
      await sendFilePartToServer(client, partName, partIndex, seq);
      pipeline.shift();
    }
  };

  const sendFilePartToServer = async (name: string, index: number, total: number): Promise<void> => {
    try {
      const message: string = fs.readFileSync(name, { encoding: 'utf-8' });
      const requestObject: IRequest = Protocoler.buildRequestObject(total, index, message, 'ACK', 'file', name);

      console.info(`Sending file ${name} to server...`);

      await Requester.request(client, requestObject)
        .then((response: Buffer) => {
          console.log('Response:', response.toString());
        })
        .catch((err) => {
          console.error((err as Error)?.message || err);
        });
    } catch (err) {
      console.error('Error sending file to server:', err);
    }
  };

  return { send };
};

export default Transferor;
