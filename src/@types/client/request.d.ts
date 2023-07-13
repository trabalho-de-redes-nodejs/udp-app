interface IRequest {
  header: IHeader;
  body: IBody;
}

interface IHeader {
  seq: number;
  ack: number;
  syn?: boolean;
  fyn?: boolean;
}

interface IBody {
  type?: TRequestType;
  fileName?: string;
  data: string;
}

type TRequestType = 'file' | 'message';
