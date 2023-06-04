interface IRequest<T> {
  client: Socket;
  data: T;
}
