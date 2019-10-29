import React from 'react';

const getPrintableValue = (value) => {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return value;
}

const TokenRow = ({ path, value, original}) => {
  const computedValue = getPrintableValue(value);
  const originalValue = getPrintableValue(original.value)
  return (
    <tr>
      <td className="info-table-monospace">{path.join('.')}</td>
      <td className="info-table-monospace">{computedValue}</td>
      <td className="info-table-monospace">{originalValue}</td>
    </tr>
  )
};

export default TokenRow;

