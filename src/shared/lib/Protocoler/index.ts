import buildRequestObject from './buildRequestObject';
import getRequestObject from './getRequestObject';

interface IProtocoler {
  buildRequestObject: (
    seq: number,
    ack: number,
    data: string,
    flag?: 'SYN' | 'FYN' | 'ACK',
    type?: TRequestType,
    fileName?: string
  ) => IRequest;
  getRequestObject: (request: string) => IRequest;
}

const Protocoler: IProtocoler = {
  buildRequestObject: buildRequestObject,
  getRequestObject: getRequestObject,
};

export default Protocoler;
