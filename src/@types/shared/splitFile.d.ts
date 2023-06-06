declare module 'split-file' {
  export function splitFileBySize(file: string, lines: number, dest?: string): Promise<string[]>;
  export function mergeFiles(inputFiles: string[], outputFile: string): Promise<void>;
}
