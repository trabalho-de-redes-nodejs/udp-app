import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import { bufferSize } from 'config/config';
import Reports from 'shared/lib/Report';

interface ITransferor {
  send(): Promise<void>;
}

const Transferor = (pipeline: PipelineControl): ITransferor => {
  const buffer: PipelineControl = pipeline;

  let ack = 0;
  let seq = 0;

  let rwnd = 0;
  let cwnd = 0;
  let ssthresh = 0;
  let mode: 'slowStart' | 'congestionAvoidance' = 'slowStart';

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
        rwnd = responseJSON.header.windowSize;
        ssthresh = responseJSON.header.windowSize / 2;

        Reports.addReport('Established connection!');
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  };

  const unpackPipeline = async (): Promise<void> => {
    const sendNextPackage = async (): Promise<any> => {
      if (seq >= buffer.getLength() || rwnd <= maximumSegmentSize) {
        return;
      }

      if (mode === 'slowStart') {
        cwnd += maximumSegmentSize;
      }

      if (mode === 'slowStart' && rwnd < cwnd) {
        mode = 'congestionAvoidance';
      }

      if (mode === 'congestionAvoidance') {
        cwnd = maximumSegmentSize;
        mode = 'slowStart';

        Reports.addReport(`Congestion avoidance mode!: ${cwnd} < ${rwnd}`);
      }

      Reports.addReport(`Sending package: ${ack} - ${ack + cwnd}`);

      const data = buffer.getDataByStartByteAndEndByte(ack, ack + cwnd);

      const requestObject: IRequest = Protocoler.buildRequestObject(getTcpHeader(), data, 'ACK', 'file', buffer.getFileName());

      Requester.request(requestObject)
        .then(async (responseBuffer: Buffer) => {
          const response: IResponse = JSON.parse(responseBuffer.toString());

          if (response.header.ack >= ack) {
            rwnd = response.header.windowSize;
            Reports.addReport(`Received ACK: ${response.header.ack} | Server RWND: ${rwnd}`);
            await sendNextPackage();
            return;
          }

          if (response.header.ack === requestObject.header.ack) {
            await Requester.request(requestObject);
            return;
          }
        })
        .catch((err) => {
          console.error((err as Error)?.message || err);
        });

      ack += data.length;
      seq += data.length;

      rwnd -= data.length;
      sendNextPackage();
    };

    await sendNextPackage().catch((err) => console.error(err));

    while (seq < buffer.getLength()) {
      await new Promise((resolve) => setTimeout(resolve, 1));
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
