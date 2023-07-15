interface IRequest {
  header: IHeader;
  body: IBody;
}

interface IBody {
  type?: TRequestType;
  fileName?: string;
  data: string;
}

interface ITcpHeader {
  ack: number;
  seq: number;
  windowSize: number;
  maximumSegmentSize: number;
}

type TRequestType = 'file' | 'message';
