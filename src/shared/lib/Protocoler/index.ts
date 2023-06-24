import buildRequestObject from './buildRequestObject';
import getRequestObject from './getRequestObject';

interface IProtocoler {
  buildRequestObject: (type: TRequestType, totalParts: number, partNumber: number, data: any, fileName?: string) => IRequest;
  getRequestObject: (request: string) => IRequest;
}

const Protocoler: IProtocoler = {
  buildRequestObject: buildRequestObject,
  getRequestObject: getRequestObject,
};

export default Protocoler;
