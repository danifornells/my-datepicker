/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorChip from '../../.storybook/components/ColorChip';
import tokensProcessor from '../../.storybook/tokens-processor';
import '../styles/base.scss';
import './foundations.stories.scss';

/* eslint-disable import/no-dynamic-require, no-undef */
const TOKENS = require(`../../build/tokens/${WEBPACK_BRAND}/tokens.foundation.json`);
const LISTABLE_TOKENS = tokensProcessor(TOKENS);
/* eslint-enable import/no-dynamic-require, no-undef */

const getColorsByConcept = (concept) => LISTABLE_TOKENS
  .filter((token) => (
    token.path[0] === 'color'
      && token.path[1] === 'foundation'
      && token.path[2] === concept
  ))
  .map((token) => ({
    ...token,
    nameSimple: token.path.filter((segment) => !['color', 'foundation', concept].includes(segment)).join('.'),
  }));

const COLORS_BRAND = getColorsByConcept('brand');
const COLORS_NEUTRAL = getColorsByConcept('neutral');
const COLORS_STATE = getColorsByConcept('state');

/**
 * Colors documentation
 */
storiesOf('Foundations|Colors', module)
  .add(
    'Overview',
    /* eslint-disable react/jsx-props-no-spreading */
    () => (
      <div>
        <div className="Storybook-Section">
          <h2 className="Storybook-Section-heading">Brand</h2>
          <div className="ColorChip-grid">
            {COLORS_BRAND.map((color) => <ColorChip key={color.name} {...color} />)}
          </div>
        </div>
        <div className="Storybook-Section">
          <h2 className="Storybook-Section-heading">Neutral</h2>
          <div className="ColorChip-grid">
            {COLORS_NEUTRAL.map((color) => <ColorChip key={color.name} {...color} />)}
          </div>
        </div>
        <div className="Storybook-Section">
          <h2 className="Storybook-Section-heading">State</h2>
          <div className="ColorChip-grid">
            {COLORS_STATE.map((color) => <ColorChip key={color.name} {...color} />)}
          </div>
        </div>
      </div>
    ),
    /* eslint-enable react/jsx-props-no-spreading */
    {
      info: {
        header: true,
        inline: true,
        source: false,
        propTables: false,
      },
    },
  );
