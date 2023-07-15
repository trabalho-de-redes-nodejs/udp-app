interface IHeader {
  seq: number;
  ack: number;
  windowSize: number;
  maximumSegmentSize: number;
  syn?: boolean;
  fyn?: boolean;
}
