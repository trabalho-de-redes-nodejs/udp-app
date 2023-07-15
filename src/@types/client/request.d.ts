interface IRequest {
  header: IHeader;
  body: IBody;
}

interface IBody {
  type?: TRequestType;
  fileName?: string;
  data: string;
}

type TRequestType = 'file' | 'message';
