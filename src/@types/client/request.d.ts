interface IRequest {
  header: IHeader;
  body: string;
}

interface IHeader {
  type: TRequestType;
  totalParts: number;
  partNumber: number;
}

type TRequestType = 'file' | 'message';
