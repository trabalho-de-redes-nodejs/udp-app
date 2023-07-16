import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import { bufferSize } from 'config/config';

interface ITransferor {
  send(): Promise<void>;
  printData(): void;
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

        console.log('Established connection!');
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

      console.log(`
        Sending package: ${ack} - ${ack + maximumSegmentSize}
      `);

      const data = buffer.getDataByStartByteAndEndByte(ack, ack + maximumSegmentSize);

      ack += data.length;
      seq += data.length;

      const requestObject: IRequest = Protocoler.buildRequestObject(getTcpHeader(), data, 'ACK', 'file', buffer.getFileName());

      Requester.request(requestObject)
        .then(async (responseBuffer: Buffer) => {
          const response: IResponse = JSON.parse(responseBuffer.toString());

          if (response.header.ack >= ack) {
            serverRwnd = response.header.windowSize;

            console.log(`
                Received ACK: ${response.header.ack}
                Server RWND: ${serverRwnd}
            `);

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
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const finishConnection = async (): Promise<void> => {
    const fyn: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'FYN', 'file', buffer.getFileName());

    await Requester.request(fyn).catch((err) => {
      console.error((err as Error)?.message || err);
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
