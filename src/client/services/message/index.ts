import { Socket } from 'dgram';
import Reader from 'client/lib/Reader';
import Requester from 'client/lib/Requester';
import Protocoler from 'shared/lib/Protocoler';

const sendMessage = async (client: Socket): Promise<void> => {
  try {
    const message: string = Reader.string('Type a message to send to the server:');
    const requestObject = Protocoler.buildRequestObject('message', 1, 1, message);

    await Requester.request(client, requestObject)
      .then((response: Buffer) => {
        console.log('Response:', response.toString());
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  } catch (err) {
    console.error((err as Error)?.message || err);
  }
};

export { sendMessage };
