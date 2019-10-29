import React from 'react';
import TokenRow from './TokenRow';
import STYLES from './TokensTable.scss';

const c = (className) => STYLES[className] || 'UNKNOWN';

const TokensTable = ({tokens}) => (
  <div className={c('TokensTable')}>
    <h1 className={c('TokensTable-Heading')}>Style tokens</h1>
    <table className="info-table">
      <thead>
      <tr>
        <th>path</th>
        <th>computedValue</th>
        <th>originalValue</th>
      </tr>
      </thead>
      <tbody>
      {tokens.map(token => <TokenRow key={token.name} {...token}/>)}
      </tbody>
    </table>
  </div>
);

export default TokensTable;

