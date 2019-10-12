import React from 'react';
import STYLES from './Test.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Test = ({children, ...props}) => (
  <h1 className={c('Test')}>{children}</h1>
);

export default Test;
