declare module 'split-file' {
  export function splitFileBySize(file: string, lines: number): Promise<string[]>;
}
