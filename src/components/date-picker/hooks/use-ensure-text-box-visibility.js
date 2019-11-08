import { useEffect } from 'react';
import { getStyle } from '../../../helpers/css'
import { DOCUMENT_SCROLLING_ELEMENT, smoothScroll } from '../../../helpers/scroll'

const useEnsureTextBoxVisibility = (isOpened, rootElementRef, popoverBoxRef) => {

  const getSafeDocumentYCoordinate = (rootElementRef, popoverBoxRef) => {
    // Calc the viewport free vertical space
    const popoverBoxHeight = popoverBoxRef.current.offsetHeight
    const viewportHeight = DOCUMENT_SCROLLING_ELEMENT.clientHeight;
    const viewportFree = viewportHeight - popoverBoxHeight;
    // Calc the distance from documentTop to bottomDatePicker including safe margin
    const datePickerOffsetTop = rootElementRef.current.offsetTop;
    const datePickerHeight = rootElementRef.current.offsetHeight;
    const datePickerMargin = 20;
    const datePickerTargetYCoordinate = datePickerOffsetTop + datePickerHeight + datePickerMargin;
    // Return the perfect coordinate to ensure visibility
    return datePickerTargetYCoordinate - viewportFree;
  }

  useEffect(
    () => {
      if (isOpened && popoverBoxRef && popoverBoxRef.current) {
        const isPopoverBoxFixed = getStyle(popoverBoxRef.current, 'position') === 'fixed';
        if (isPopoverBoxFixed) {
          const safeDocumentYCoordinate = getSafeDocumentYCoordinate(rootElementRef, popoverBoxRef);
          smoothScroll({
            y: safeDocumentYCoordinate
          })
        }
      }

      return () => {}

    },
    [isOpened]
  );
}

export default useEnsureTextBoxVisibility;