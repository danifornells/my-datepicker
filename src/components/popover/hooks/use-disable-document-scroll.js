import { useEffect } from 'react';
import { getStyle } from '../../../helpers/css';
import { disableScroll, DOCUMENT_SCROLLING_ELEMENT } from '../../../helpers/scroll';

/**
 *  Disable/Enable document scroll according if box is opened & doesn't floats (fixed)
 */
const useDisableDocumentScroll = (innerRef, open) => {
  useEffect(
    () => {
      if (innerRef.current) {
        const isFixed = getStyle(innerRef.current, 'position') === 'fixed';
        if (open && isFixed) {
          disableScroll(DOCUMENT_SCROLLING_ELEMENT)
        } else {
          disableScroll(DOCUMENT_SCROLLING_ELEMENT, true)
        }
      }

      return () => {
        disableScroll(DOCUMENT_SCROLLING_ELEMENT, true)
      }
    },
    [innerRef, open]
  );
}

export default useDisableDocumentScroll;