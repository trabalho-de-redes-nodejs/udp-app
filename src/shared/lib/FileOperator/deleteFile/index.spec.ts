import fs from 'fs';
import { describe, expect, it } from 'vitest';
import { createFileWithRandomContent } from '../createFile';
import deleteFile from '.';

describe('deleteFile', () => {
  it('should create an empty file of the specified size', async () => {
    const fileName = 'test.txt';
    const fileSize = 100;

    await createFileWithRandomContent(fileName, fileSize);

    await deleteFile(fileName);

    expect(fs.existsSync(fileName)).toBe(false);
  });
});
