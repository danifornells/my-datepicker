import React from 'react';
import './ColorChip.scss';

const ColorChip = ({nameSimple, path, value}) => {
  const sampleStyle = {
    backgroundColor: value
  };
  return (
    <div className="ColorChip">
      <div style={sampleStyle} className="ColorChip-sample"></div>
      <td className="ColorChip-name">{nameSimple}</td>
      <td className="ColorChip-value">{value}</td>
      <td className="ColorChip-path">{path.join('.')}</td>
    </div>
  )
};

export default ColorChip;

