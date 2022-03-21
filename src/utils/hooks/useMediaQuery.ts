import { useCallback, useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const getMatches = (mediaQuery: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQuery).matches;
    }

    return false;
  };

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // trigger at the first client-side load and if query changes
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  return matches;
};

export default useMediaQuery;
