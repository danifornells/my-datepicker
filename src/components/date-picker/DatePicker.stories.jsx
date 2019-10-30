/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, boolean, select,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as DATE_LOCALES from '../../locales/date';

import '../../styles/base.scss';
import DatePicker, { DATE_FORMATS } from './DatePicker';

const DEFAULT_PROPS = DatePicker.defaultProps;

/**
 * An example of DatePicker component
 */
storiesOf('Components|DatePicker', module)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    () => {
      const datePickerPropsKnobs = {
        id: text('id', 'my-storybook-datepicker'),
        disabled: boolean('disabled', DEFAULT_PROPS.disabled),
        label: text('label', 'Your next challenge on:'),
        name: text('name', 'next-challenge-date'),
        placeholder: text('placeholder', 'Choose a date ...'),
        required: boolean('required', DEFAULT_PROPS.required),
        min: text('min', DEFAULT_PROPS.min),
        max: text('max', DEFAULT_PROPS.max),
        value: text('value', DEFAULT_PROPS.value),
        language: select('language', Object.keys(DATE_LOCALES), DEFAULT_PROPS.language),
        dateFormat: select('dateFormat', DATE_FORMATS, DEFAULT_PROPS.dateFormat),
        className: text('className', ''),
        onOpen: action('onOpen'),
        onClose: action('onClose'),
        onChange: action('onChange'),
      };
      /* eslint-disable react/jsx-props-no-spreading */
      return (
        <DatePicker {...datePickerPropsKnobs} />
      );
      /* eslint-enable react/jsx-props-no-spreading */
    },
    {
      info: {
        header: true,
        inline: true,
        text: `
DatePicker allows users to choose a date without having an always visible calendar.\n
It's a component with no specific styles or tokens, composed by:\n
- **TextBox** (to trigger calendar visibility and reflect the selected date)
- **Popover** (to wrap calendar)
- **Calendar** (to choose a date)`,
      },
    },
  );
