import { Socket } from 'dgram';
import fs from 'fs';
import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import FileSplitter from 'shared/lib/FileSplitter';
import { bufferSize } from 'config/config';

interface ITransferor {
  send(): Promise<void>;
  printData(): void;
}

const Transferor = (pipeline: PipelineControl, clientSocket: Socket): ITransferor => {
  const buffer: PipelineControl = pipeline;
  const client = clientSocket;

  let ack = 0;
  let seq = 0;
  const windowSize = pipeline.getLength();
  const maximumSegmentSize = bufferSize;

  const send = async (): Promise<void> => {
    await establishConnection();
    await unpackPipeline();
  };

  const establishConnection = async (): Promise<void> => {
    const firstWay: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    await Requester.request(client, firstWay)
      .then((response: string) => {
        const responseJSON: IResponse = JSON.parse(response);

        seq = responseJSON.header.seq;
        ack = responseJSON.header.seq + maximumSegmentSize;
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  };

  const unpackPipeline = async (): Promise<void> => {
    await sendFileToServerByParts()
      .catch((err) => console.error(err))
      .finally(() => {
        client.close();
        // FileSplitter.deleteFilesFromArray(pipeline.getPipeline());
      });
  };

  const sendFileToServerByParts = async (): Promise<void> => {
    let numberPackage = 0;
    while (seq < buffer.getLength()) {
      //   console.log(seq, ' ', ack);
      const data = buffer.getDataByStartByteAndEndByte(seq, ack);

      numberPackage++;
      await sendFilePartToServer(data, numberPackage);
    }
  };

  const sendFilePartToServer = async (data: string, numberPackage: number): Promise<void> => {
    try {
      const requestObject: IRequest = Protocoler.buildRequestObject(getTcpHeader(), data, 'ACK');

      console.info(`Sending to server package ${numberPackage}...`);

      await Requester.request(client, requestObject)
        .then((response: Buffer) => {
          console.log('Response:', response.toString());
          const responseJSON = JSON.parse(response.toString());

          seq = responseJSON.header.ack;
          //   ack = responseJSON.header.seq;
        })
        .catch((err) => {
          console.error((err as Error)?.message || err);
        });
    } catch (err) {
      console.error('Error sending file to server:', err);
    }
  };

  const getTcpHeader = (): ITcpHeader => {
    return {
      ack,
      seq,
      windowSize,
      maximumSegmentSize,
    };
  };

  const printData = (): void => {
    console.log('Seq Cliente: ', seq);
    console.log('Ack Cliente: ', ack);
  };

  return { send, printData };
};

export default Transferor;
