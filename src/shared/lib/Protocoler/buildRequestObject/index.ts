const checkAcceptedTypes = (type: TRequestType): boolean => {
  const acceptedTypes: TRequestType[] = ['file', 'message'];

  return acceptedTypes.includes(type);
};

const buildRequestObject = (type: TRequestType, totalParts: number, partNumber: number, data: string, fileName?: string): IRequest => {
  if (!checkAcceptedTypes(type)) {
    throw new Error('Invalid request type');
  }

  return {
    header: {
      type,
      totalParts,
      partNumber,
      fileName,
    },
    body: data,
  };
};

export default buildRequestObject;
export { checkAcceptedTypes };
