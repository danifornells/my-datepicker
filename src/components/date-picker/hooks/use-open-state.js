import { useState } from 'react';

/**
 * Manages state for calendar open/close.
 *
 * @param(Boolean) initialValue
 * @param(Function) onOpen
 * @param(Function) onClose
 */
const useOpenState = (initialValue, onOpen, onClose) => {
  const [isOpened, setOpenState] = useState(initialValue);
  const setOpen = (newState) => {
    if (newState === isOpened) return;
    setOpenState(newState);
    newState
      ? onOpen()
      : onClose();
  };
  return [
    isOpened,
    setOpen
  ];
}

export default useOpenState;