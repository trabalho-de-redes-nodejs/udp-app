const checkAcceptedTypes = (type: TRequestType): boolean => {
  const acceptedTypes: TRequestType[] = ['file', 'message'];

  return acceptedTypes.includes(type);
};

const buildRequestObject = (
  seq?: number,
  ack: number,
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
      seq,
      ack,
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
