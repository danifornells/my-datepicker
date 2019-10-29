/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import tokensProcessor from '../../../.storybook/tokens-processor';
import PopoverBox from './PopoverBox';
import PopoverWrapper from './PopoverWrapper';
import PropTableWithTokens from '../../../.storybook/components/PropTableWithTokens';

import '../../styles/base.scss';

/* eslint-disable import/no-dynamic-require, no-undef */
const TOKENS = require(`../../../build/tokens/${WEBPACK_BRAND}/tokens.popover.json`);
const LISTABLE_TOKENS = tokensProcessor(TOKENS);
const FLOATS_FROM_BREAKPOINTS = TOKENS.config.floatsFrom.popover.box.value;
/* eslint-enable import/no-dynamic-require, no-undef */


/**
 * An example of Popover component
 */
storiesOf('Components|Popover', module)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    () => {
      const floatsFrom = select('floatsFrom', FLOATS_FROM_BREAKPOINTS, 'xs');
      const className = text('className', '');
      const [isOpened, setIsOpened] = useState(false);
      const onCloseRequest = (e, args) => {
        action('onCloseRequest')(e, args);
        setIsOpened(false);
      };

      return (
        <PopoverWrapper>
          <button onClick={() => setIsOpened(true)} type="button">Open popover</button>
          <PopoverBox
            open={isOpened}
            floatsFrom={floatsFrom}
            className={className}
            onCloseRequest={onCloseRequest}
          >
            <h2>Inner content</h2>
            <button onClick={() => setIsOpened(false)} type="button">Close popover</button>
          </PopoverBox>
        </PopoverWrapper>
      );
    },
    {
      info: {
        header: true,
        inline: true,
        text: `
Popover is a floating wrapper for inner content to be shown on demand.\n
It's closable by clicking outside or pressing ESC key.\n
Typically floats relatively from it's ancestor pinned to bottom-left boundary.\n
On small devices will appear fixed from bottom instead of floating.\n
The breakpoint when starts to float is configurable by \`floatsFrom\` prop.\n
Two components are needed to make it happen:
- **PopoverWrapper** (wraps ancestor CTA, and sets relative positioning from it. Optional)
- **PopoverBox** (the floating wrapper itself and all props & actions needed)`,
        TableComponent: PropTableWithTokens(LISTABLE_TOKENS),
        propTablesExclude: [PopoverWrapper],
      },
    },
  );
