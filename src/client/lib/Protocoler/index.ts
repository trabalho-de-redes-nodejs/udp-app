import buildRequestObject from './buildRequestObject';

interface IProtocoler {
  buildRequestObject: (type: TRequestType, totalParts: number, partNumber: number, data: any) => IRequest;
}

const Protocoler: IProtocoler = {
  buildRequestObject: buildRequestObject,
};

export default Protocoler;
