import { describe, expect, it } from 'vitest';
import { validExtensions, validateFileName } from '.';

describe('validateFileName', () => {
  it('should return the file name for a valid input', () => {
    const validFileName = 'document.txt';
    expect(() => {
      const result = validateFileName(validFileName);
      expect(result).toBe(validFileName);
    }).not.toThrow();
  });

  it('should throw an error for an empty file name', () => {
    const emptyFileName = '';
    expect(() => {
      validateFileName(emptyFileName);
    }).toThrowError('Invalid file name. Please enter a non-empty string.');
  });

  it('should throw an error for a file name with invalid characters', () => {
    const invalidFileName = 'doc*ument.txt';
    expect(() => {
      validateFileName(invalidFileName);
    }).toThrowError('Invalid file name. Please remove any invalid characters (\\/|:*?"<>).');
  });

  it('should throw an error for a file name with an invalid extension', () => {
    const invalidExtensionFileName = 'document.svg';
    expect(() => {
      validateFileName(invalidExtensionFileName);
    }).toThrowError(
      `Invalid file name. Please use a valid file extension (${validExtensions.join(', ').replace(/, ([^,]*)$/, ' or $1')}).`
    );
  });

  it('should throw an error for a file name with no extension', () => {
    const invalidExtensionFileName = 'document';
    expect(() => {
      validateFileName(invalidExtensionFileName);
    }).toThrowError(
      `Invalid file name. Please use a valid file extension (${validExtensions.join(', ').replace(/, ([^,]*)$/, ' or $1')}).`
    );
  });
});
