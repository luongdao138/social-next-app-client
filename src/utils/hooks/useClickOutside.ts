import React, { useEffect, useRef } from 'react';

type Params = {
  cb: () => void;
  ref: React.RefObject<HTMLElement>;
};

function useClickOutside({ cb, ref }: Params) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callbackRef.current?.();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);
}

export default useClickOutside;
