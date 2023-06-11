import { timeoutControl } from './TimeoutControl';
import { calcRTT } from './calcRTT';

interface Timer {
  timeoutControl: (key: string, time: number, callback: () => any) => void;
  calcRTT: (estimatedRTT: number, devRTT: number) => number;
}

const Timer: Timer = {
  timeoutControl: timeoutControl,
  calcRTT: calcRTT,
};

export default Timer;
