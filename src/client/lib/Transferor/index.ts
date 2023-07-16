import { Socket } from 'dgram';
import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
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
    await finishConnection();
  };

  const establishConnection = async (): Promise<void> => {
    const syn: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    await Requester.request(client, syn)
      .then((response: string) => {
        const responseJSON: IResponse = JSON.parse(response);

        seq = responseJSON.header.seq;
        ack = responseJSON.header.seq;
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  };

  const unpackPipeline = async (): Promise<void> => {
    const sendFileToServerByParts = async (): Promise<void> => {
      for (let numberPackage = 0; seq < buffer.getLength(); numberPackage++) {
        console.info(`Sending to server package ${numberPackage}...`);

        printData();
        const data = buffer.getDataByStartByteAndEndByte(ack, ack + maximumSegmentSize);
        await sendFilePartToServer(data);
      }
    };

    const sendFilePartToServer = async (data: string): Promise<any> => {
      try {
        const requestObject: IRequest = Protocoler.buildRequestObject(getTcpHeader(), data, 'ACK', 'file', buffer.getFileName());

        return await Requester.request(client, requestObject)
          .then((response: Buffer) => {
            const responseJSON = JSON.parse(response.toString());

            seq = responseJSON.header.ack;
            ack = responseJSON.header.ack;

            return responseJSON as IResponse;
          })
          .catch((err) => {
            console.error((err as Error)?.message || err);
          });
      } catch (err) {
        console.error('Error sending file to server:', err);
      }
    };

    await sendFileToServerByParts().catch((err) => console.error(err));
  };

  const finishConnection = async (): Promise<void> => {
    const fyn: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'FYN', 'file', buffer.getFileName());

    await Requester.request(client, fyn)
      .catch((err) => {
        console.error((err as Error)?.message || err);
      })
      .finally(() => {
        client.close();
      });
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
