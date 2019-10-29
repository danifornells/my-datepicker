import React from 'react';
import PropTable from '@storybook/addon-info/dist/components/PropTable/index';
import TokensTable from './TokensTable';

/* eslint-disable react/jsx-props-no-spreading */
const PropTableWithTokens = (tokens) => (
  (props) => (
    <div className='PropsTable-group'>
      <PropTable {...props} />
      <TokensTable tokens={tokens} />
    </div>
  )
);
/* eslint-enable react/jsx-props-no-spreading */

export default PropTableWithTokens;
