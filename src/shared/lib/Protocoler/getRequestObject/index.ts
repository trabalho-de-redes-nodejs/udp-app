import { checkAcceptedTypes } from '../buildRequestObject';

const verifyRequest = (request: any): boolean => {
  if (!request?.body || !request?.header) {
    return false;
  }

  const header = request?.header;

  if (!header?.type || !header?.totalParts || !header?.partNumber) {
    return false;
  }

  return true;
};

const getRequestObject = (data: string): IRequest => {
  try {
    if (!verifyRequest(JSON.parse(data))) {
      throw new Error('Invalid request');
    }

    const request: IRequest = JSON.parse(data);
    const { type, totalParts, partNumber } = request.header;

    if (!checkAcceptedTypes(type)) {
      throw new Error('Invalid request type');
    }

    if (totalParts < 1) {
      throw new Error('Invalid total parts');
    }

    if (partNumber < 1 || partNumber > totalParts) {
      throw new Error('Invalid part number');
    }

    return request;
  } catch (e) {
    throw new Error('Invalid request');
  }
};

export default getRequestObject;
export { checkAcceptedTypes, verifyRequest };
