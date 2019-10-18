const templateHeading = require('./../../../.tasks/helpers/template-heading');

/**
 * Template to render Icons index
 *
 * @param {AvailableIcon[]} icons - The available icons
 * @return {String} The fulfilled template
 */

module.exports = (icons) => `
/*
${templateHeading}
*/

${icons.map((icon) => `import ${icon.componentName} from './${icon.componentName}';`).join('\n')}

/* eslint-disable */
const ICONS_LIST = ${JSON.stringify(
    icons.map(({ sourcePath, baseName, componentName }) => ({
      sourcePath,
      baseName,
      componentName,
    })),
    null,
    2,
  )};
/* eslint-enable */

export {
  ${icons.map((icon) => icon.componentName).join(',\n  ')},
  ICONS_LIST as iconsList,
};
`;
