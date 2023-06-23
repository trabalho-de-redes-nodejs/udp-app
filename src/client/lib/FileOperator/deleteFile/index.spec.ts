import fs from 'fs';
import { describe, expect, it } from 'vitest';
import deleteFile from '../deleteFile';
import { createFileWithRandomContent } from '../createFile';

describe('createFileWithRandomContent', () => {
  it('should create an empty file of the specified size', async () => {
    const fileName = 'test.txt';
    const fileSize = 100;

    await createFileWithRandomContent(fileName, fileSize);

    deleteFile(fileName);

    expect(fs.existsSync(fileName)).toBe(false);
  });
});
