import React from 'react';
import Test from './Test';
import IconClose from '../icons/IconClose'

export default { title: 'Components|Test' };

export const myFirstTest = () => <Test>Hello World <IconClose></IconClose></Test>;

export const mySecondTest = () => <Test>Bye World</Test>;
