import { useRef } from "react";

export function useTimeouts() {
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  const add = (timeout: NodeJS.Timeout) => {
    timeoutRef.current.push(timeout);
  };

  const clear = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  return { add, clear };
}
