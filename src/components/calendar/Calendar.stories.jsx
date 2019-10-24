/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import PropTable from '@storybook/addon-info/dist/components/PropTable/index';
import TokensTable from '../../../.storybook/components/TokensTable';
import tokensProcessor from '../../../.storybook/tokens-processor';
import Calendar from './Calendar';
import * as calendarLocales from './Calendar.locales';

const componentTokens = require('../../../build/tokens/bourgeois/tokens.calendar.json');

const listableTokens = tokensProcessor(componentTokens);

/* eslint-disable react/jsx-props-no-spreading */
const PropTableWithTokens = (props) => (
  <div>
    <PropTable {...props} />
    <TokensTable tokens={listableTokens} />
  </div>
);
/* eslint-enable react/jsx-props-no-spreading */

/**
 * An example of Calendar component
 */
storiesOf('Components|Calendar', module)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    () => {
      const min = text('min', '');
      const max = text('max', '');
      const value = text('value', '2017-10-01');
      const language = select('language', Object.keys(calendarLocales), 'en');
      const className = text('className', '');
      const key = [min, max, language, value].filter(Boolean).join('_');

      return (
        <Calendar
          key={key}
          min={min}
          max={max}
          value={value}
          language={language}
          className={className}
          onDateChange={action('onDateChange')}
        />
      );
    },
    {
      info: {
        header: true,
        inline: true,
        text: 'Calendar let\'s people choose a day.',
        TableComponent: PropTableWithTokens,
      },
      knobs: {
        timestamps: true,
      },
    },
  );


/**
 * An example of Limited Calendar component
 */
storiesOf('Components|Calendar', module)
  .addDecorator(withKnobs)
  .add(
    'Limited fall 2017',
    () => {
      const min = text('min', '2017-09-21');
      const max = text('max', '2017-12-20');
      const value = text('value', '');
      const language = select('language', Object.keys(calendarLocales), 'en');
      const className = text('className', '');
      const key = [min, max, language, value].filter(Boolean).join('_');

      return (
        <Calendar
          key={key}
          min={min}
          max={max}
          value={value}
          language={language}
          className={className}
          onDateChange={action('onDateChange')}
        />
      );
    },
    {
      info: {
        header: true,
        inline: true,
        source: false,
        propTables: false,
      },
      knobs: {
        timestamps: true,
      },
    },
  );
