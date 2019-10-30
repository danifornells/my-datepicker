/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, boolean, select,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import tokensProcessor from '../../../.storybook/tokens-processor';
import TextBox, { INPUT_TYPES } from './TextBox';
import PropTableWithTokens from '../../../.storybook/components/PropTableWithTokens';

import '../../styles/base.scss';

/* eslint-disable import/no-dynamic-require, no-undef */
const TOKENS = require(`../../../build/tokens/${WEBPACK_BRAND}/tokens.text-box.json`);
const LISTABLE_TOKENS = tokensProcessor(TOKENS);
/* eslint-enable import/no-dynamic-require, no-undef */

const DEFAULT_PROPS = TextBox.defaultProps;

/**
 * An example of TextBox component
 */
storiesOf('Components|TextBox', module)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    () => {
      const textBoxPropsKnobs = {
        autoComplete: text('autoComplete', DEFAULT_PROPS.autocomplete),
        disabled: boolean('disabled', DEFAULT_PROPS.disabled),
        id: text('id', 'my-storybook-text-box'),
        inputmode: text('inputmode', DEFAULT_PROPS.inputmode),
        label: text('label', 'Label here'),
        name: text('name', 'my-storybook-text-box'),
        placeholder: text('placeholder', 'You can type ...'),
        readOnly: boolean('readOnly', DEFAULT_PROPS.readonly),
        required: boolean('required', DEFAULT_PROPS.required),
        type: select('type', INPUT_TYPES, DEFAULT_PROPS.type),
        value: text('value', DEFAULT_PROPS.value),
        className: text('className', ''),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
        onChange: action('onChange'),
      };

      /* eslint-disable react/jsx-props-no-spreading */
      return (
        <TextBox
          {...textBoxPropsKnobs}
        />
      );
      /* eslint-enable react/jsx-props-no-spreading */
    },
    {
      info: {
        header: true,
        inline: true,
        text: `
TextBox is an enriched input tag to handle user inputs based on text.\n`,
        TableComponent: PropTableWithTokens(LISTABLE_TOKENS),
      },
    },
  );
