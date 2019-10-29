import { useEffect } from 'react';

const KEYCODES = {
  ESCAPE: 27,
};

const useCloseRequest = (onCloseRequest, innerRef, open) => {
  useEffect(
    () => {
      if (innerRef.current) {
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
      }

      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeydown);
      }

      function handleClick(e) {
        open && innerRef.current && !innerRef.current.contains(e.target) && onCloseRequest(e, { source: 'CLICK' });
      }

      function handleKeydown(e) {
        open && (e.keyCode === KEYCODES.ESCAPE) && onCloseRequest(e, { source: 'ESCAPE' });
      }
    },
    [onCloseRequest, innerRef]
  );
}

export default useCloseRequest;