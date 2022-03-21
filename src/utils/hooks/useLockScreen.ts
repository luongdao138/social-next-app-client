import useIsoMorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useLockScreen = (lock: boolean = true) => {
  useIsoMorphicLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (!lock) {
      document.body.style.overflow = 'visible';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lock]);
};

export default useLockScreen;
