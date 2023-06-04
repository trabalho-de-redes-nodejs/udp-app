declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ADDRESS: string;
    }
  }
}

export {};
