const checkAcceptedTypes = (type: TRequestType): boolean => {
  const acceptedTypes: TRequestType[] = ['file', 'message'];

  return acceptedTypes.includes(type);
};

const buildRequestObject = (
  header: ITcpHeader,
  data: string,
  flag?: 'SYN' | 'FYN' | 'ACK',
  type?: TRequestType,
  fileName?: string
): IRequest => {
  if (type && !checkAcceptedTypes(type)) {
    throw new Error('Invalid request type');
  }

  return {
    header: {
      seq: header.seq,
      ack: header.ack,
      windowSize: header.windowSize,
      maximumSegmentSize: header.maximumSegmentSize,
      syn: flag === 'SYN',
      fyn: flag === 'FYN',
    },
    body: {
      data,
      type,
      fileName,
    },
  };
};

export default buildRequestObject;
export { checkAcceptedTypes };
