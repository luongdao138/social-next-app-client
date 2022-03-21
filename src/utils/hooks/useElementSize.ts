import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';
import useIsoMorphicLayoutEffect from './useIsomorphicLayoutEffect';

interface Size {
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({ height: 0, width: 0 });

  const handleResize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref?.offsetWidth, ref?.offsetHeight]);

  useEventListener('resize', handleResize);
  useIsoMorphicLayoutEffect(() => {
    handleResize();
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [setRef, size];
}

export default useElementSize;
