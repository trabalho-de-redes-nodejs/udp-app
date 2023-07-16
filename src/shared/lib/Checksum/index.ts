import md5 from 'md5';

interface IChecksum {
  generateChecksum: (data: string) => string;
  compareChecksum: (data: string, checksum: string) => boolean;
}

const Checksum: IChecksum = {
  generateChecksum: (data: string): string => {
    if (data === '') return '';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return md5(data) || '';
  },
  compareChecksum: (data: string, checksum: string): boolean => {
    return Checksum.generateChecksum(data) === checksum;
  },
};

export default Checksum;
