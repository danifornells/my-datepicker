/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

configure(require.context('../src', true, /\.stories\.(js|jsx)$/), module);
addDecorator(withInfo);
