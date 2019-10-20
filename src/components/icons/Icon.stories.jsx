/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import * as IconComponents from './index';
import { ICON_SIZES } from './Icon.prop-types';
import IconLink from './IconLink';
import STYLES from './Icon.stories.scss'; // eslint-disable-line no-unused-vars

/**
 * Generic icon component to illustrate the overview of available icons
 */
const Icon = ({ icon, ...props }) => {
  const IconComponent = IconComponents[icon];
  return <IconComponent {...props} />; // eslint-disable-line react/jsx-props-no-spreading
};


/**
 * An example of single icon
 */
storiesOf('Components|Icon', module)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    () => {
      const size = select('size', [...Object.keys(ICON_SIZES)], 'medium');
      const className = text('className', '');
      return <IconLink size={size} className={className} />;
    },
    {
      info: {
        header: true,
        inline: true,
        text: 'Icons are used to better illustrate actions.',
      },
    },
  );

/**
 * An overview of available icons
 */
storiesOf('Components|Icon', module)
  .add(
    'Available icons',
    () => {
      const size = 'large';
      const className = 'Storybook-Icon';
      const { iconsList, ...iconsToShow } = IconComponents;
      const iconsShown = Object.keys(iconsToShow)
        .map((icon) => (
          <div className="Storybook-IconBox" key={icon}>
            <Icon icon={icon} size={size} className={className} />
            <span className="Storybook-IconName">{icon}</span>
          </div>
        ));
      return (
        <div className="Storybook-IconsGrid">
          {iconsShown}
        </div>
      );
    }, {
      info: {
        header: true,
        inline: true,
        source: false,
        propTables: false,
      },
    },
  );