import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;




// Suggested functionality t0 add 
//1. Debounce Resize Events
//Resize events can fire frequently, causing performance issues. Implementing a debounce mechanism can reduce the number of state updates:

import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768, debounceDelay = 100) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    const debounceResize = (() => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(handleResize, debounceDelay);
      };
    })();

    window.addEventListener('resize', debounceResize);

    return () => window.removeEventListener('resize', debounceResize);
  }, [breakpoint, debounceDelay]);

  return isMobile;
};

export default useIsMobile;


//2. Add Initial Window Size Check
//If the hook is used server-side (e.g., in SSR), it's good to provide an initial check for the window size:


const isBrowser = typeof window !== 'undefined';
const initialIsMobile = isBrowser ? window.innerWidth < breakpoint : false;
const [isMobile, setIsMobile] = useState(initialIsMobile);



//3. Support for Orientation Changes
//If your application is sensitive to orientation (landscape vs. portrait), you can extend the functionality to include orientation checks:

const handleResize = () => {
  setIsMobile(window.innerWidth < breakpoint || window.innerHeight < breakpoint);
};






