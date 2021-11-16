import React from 'react'

function useIsMountedRef() {
      const isMountedRef = React.useRef(null);
      React.useEffect(() => {
            isMountedRef.current = true;
            return () => isMountedRef.current = false;
      });
      return isMountedRef;
}

export default useIsMountedRef;