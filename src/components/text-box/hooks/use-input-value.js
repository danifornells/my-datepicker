import { useState } from 'react';

const useInputValue = (initialValue, onChange) => {
  const [currentValue, setValue] = useState(initialValue);
  return {
    currentValue,
    setValue,
    onChangeHandler: event => {
      setValue(event.target.value);
      onChange(event, {value: event.target.value});
    }
  };
}

export default useInputValue;