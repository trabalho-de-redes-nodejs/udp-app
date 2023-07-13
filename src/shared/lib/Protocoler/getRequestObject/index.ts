import { checkAcceptedTypes } from '../buildRequestObject';

const verifyRequest = (request: any): boolean => {
  if (!request?.body || !request?.header) {
    return false;
  }

  const header = request?.header;

  if (!header?.type || !header?.seq || !header?.ack) {
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
    const { type, seq, ack } = request.header;

    if (!type) {
      throw new Error('Invalid request type');
    }

    if (!checkAcceptedTypes(type)) {
      throw new Error('Invalid request type');
    }

    if (seq < 1) {
      throw new Error('Invalid total parts');
    }

    if (ack < 1 || ack > seq) {
      throw new Error('Invalid part number');
    }

    return request;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    throw new Error((err as Error)?.message || err);
  }
};

export default getRequestObject;
export { checkAcceptedTypes, verifyRequest };
