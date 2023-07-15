interface IHeader {
  seq: number;
  ack: number;
  syn?: boolean;
  fyn?: boolean;
}
