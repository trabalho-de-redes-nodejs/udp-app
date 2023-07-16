import Reports from '../Report';
import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import { bufferSize } from 'config/config';

interface ITransferor {
  send(): Promise<void>;
}

const Transferor = (pipeline: PipelineControl): ITransferor => {
  const buffer: PipelineControl = pipeline;

  let ack = 0;
  let seq = 0;

  let serverRwnd = 0;

  const windowSize = pipeline.getLength();
  const maximumSegmentSize = bufferSize;

  const send = async (): Promise<void> => {
    await establishConnection();
    await unpackPipeline();
    await finishConnection();
  };

  const establishConnection = async (): Promise<void> => {
    const syn: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    await Requester.request(syn)
      .then((response: string) => {
        const responseJSON: IResponse = JSON.parse(response);

        seq = responseJSON.header.seq;
        ack = responseJSON.header.seq;
        serverRwnd = responseJSON.header.windowSize;

        Reports.addReport('Established connection!');
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  };

  const unpackPipeline = async (): Promise<void> => {
    const sendNextPackage = async (): Promise<any> => {
      if (seq >= buffer.getLength() || serverRwnd <= maximumSegmentSize) {
        return;
      }

      Reports.addReport(`Sending package: ${ack} - ${ack + maximumSegmentSize}`);

      const data = buffer.getDataByStartByteAndEndByte(ack, ack + maximumSegmentSize);

      ack += data.length;
      seq += data.length;

      const requestObject: IRequest = Protocoler.buildRequestObject(getTcpHeader(), data, 'ACK', 'file', buffer.getFileName());

      Requester.request(requestObject)
        .then(async (responseBuffer: Buffer) => {
          const response: IResponse = JSON.parse(responseBuffer.toString());

          if (response.header.ack >= ack) {
            serverRwnd = response.header.windowSize;

            Reports.addReport(`Received ACK: ${response.header.ack} | Server RWND: ${serverRwnd}`);

            await sendNextPackage();
          }
        })
        .catch((err) => {
          console.error((err as Error)?.message || err);
        });

      serverRwnd -= data.length;
      sendNextPackage();
    };

    await sendNextPackage().catch((err) => console.error(err));

    while (seq < buffer.getLength()) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  const finishConnection = async (): Promise<void> => {
    const fyn: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'FYN', 'file', buffer.getFileName());

    await Requester.request(fyn)
      .catch((err) => {
        console.error((err as Error)?.message || err);
      })
      .finally(() => {
        Reports.addReport('Finished connection!');
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

  return { send };
};

export default Transferor;
