import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const getMatches = (mediaQuery: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQuery).matches;
    }

    return false;
  };

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // trigger at the first client-side load and if query changes
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
