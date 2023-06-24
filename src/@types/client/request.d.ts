interface IRequest {
  header: IHeader;
  body: string;
}

interface IHeader {
  type: TRequestType;
  totalParts: number;
  partNumber: number;
  fileName?: string;
}

type TRequestType = 'file' | 'message';
