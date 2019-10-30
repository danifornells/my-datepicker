import { isValidDateString } from '../helpers/dates';

/**
 * Custom PropType validation for DateString
 * - Passes if it's falsely value
 * - Passes if it's a valid DateString
 */
const optionalDateString = (props, propName, componentName) => {
  const date = props[propName];
  if (date === '' || date === null || typeof date === 'undefined') return null;
  return (typeof date !== 'string' || !isValidDateString(date))
    ? new Error(
      `Given '${date}' seems to be an invalid prop ${propName} supplied to ${componentName}.\n
      A valid dateString (YYYY-MM-DD) is expected.`,
    )
    : null;
};

export default optionalDateString;
