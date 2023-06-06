import fs from 'fs';
import { describe, expect, it } from 'vitest';
import { createFileWithRandomContent, deleteFile } from '.';

describe('createFileWithRandomContent', () => {
  it('should create an empty file of the specified size', async () => {
    const fileName = 'test.txt';
    const fileSize = 100;

    const result = await createFileWithRandomContent(fileName, fileSize);

    expect(result).toBe(true);
    expect(fs.existsSync(fileName)).toBe(true);
    expect(fs.statSync(fileName).size).toBe(fileSize);

    deleteFile(fileName);
  });
});
