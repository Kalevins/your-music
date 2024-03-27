import { useState, useEffect } from 'react';

export const useLocalStorage = (key, isParsed = false) => {
  const [state, setState] = useState(() => {
    if (isParsed) {
      return JSON.parse(window.localStorage.getItem(key)) || [];
    }
    return window.localStorage.getItem(key) || '';
  });

  const setLocalStorage = (value) => {
    if (isParsed) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.setItem(key, value);
    }
    setState(value);
  }

  useEffect(() => {
    const handleStorageChange = () => {
      if (isParsed) {
        setState(JSON.parse(window.localStorage.getItem(key)) || []);
      } else {
        setState(window.localStorage.getItem(key) || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [state, setLocalStorage];
}
