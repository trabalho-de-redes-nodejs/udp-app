import request from './request';

interface IRequester {
  //   request: (client: Socket, data: IRequest) => Promise<Buffer | string>;
  request: (data: IRequest) => Promise<any>;
}

const Requester: IRequester = {
  request: request,
};

export default Requester;
