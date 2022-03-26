import { DependencyList, useEffect, useRef } from 'react';

interface Params {
  deps?: DependencyList;
  handler: () => void;
  timeout: number;
}

const useEffectDebounce = ({ deps, handler, timeout }: Params) => {
  const handlerRef = useRef<() => void>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!handlerRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      handlerRef.current?.();
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, deps);
};

export default useEffectDebounce;
