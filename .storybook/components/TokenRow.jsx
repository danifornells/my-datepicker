import React from 'react';

const TokenRow = ({ path, value, original}) => (
  <tr>
    <td className="info-table-monospace">{path.join('.')}</td>
    <td className="info-table-monospace">{value}</td>
    <td className="info-table-monospace">{original.value}</td>
  </tr>
);

export default TokenRow;

