/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { JSDOM } = require('jsdom');
const toComponentName = require('./helpers/string-to-component-name');
const writeFile = require('./helpers/write-file');
const iconComponentTemplate = require('../src/components/icons/Icon.template');
const iconsIndexTemplate = require('../src/components/icons/index.template');

const SOURCE_PATH = path.resolve(__dirname, '../src/assets/icons/');
const DESTINATION_PATH = path.resolve(__dirname, '../src/components/icons/');


/**
 * @typedef {Object}         AvailableIcon
 * @property {String}        sourcePath         - Original path where the file was found
 * @property {String}        baseName           - Original file name without extension
 * @property {String}        componentName      - Component-ready name from original one
 * @property {String}        svgData            - Inner SVG content extracted from file content
 */


/**
 * Validates the current date, adding error validation if date is invalid
 *
 * @return {AvailableIcon[]} The current available icons found in this project
 */
const getCurrentIcons = async () => glob.sync(path.join(SOURCE_PATH, '*.svg'))
  .map((sourcePath) => {
    const baseName = path.basename(sourcePath, '.svg');
    const fileContents = fs.readFileSync(sourcePath, 'utf8');
    const svgDocument = new JSDOM(fileContents);
    return {
      sourcePath: path.relative(process.cwd(), sourcePath),
      baseName,
      componentName: toComponentName(`icon-${baseName}`),
      svgData: svgDocument.window.document.querySelector('svg').innerHTML,
    };
  });


/**
 * Build Icon components from available SVG icons found on assets
 */
const buildIcons = async () => {
  // Get available icons
  const availableIcons = await getCurrentIcons();
  // Render each one into new component
  const writeBuffer = availableIcons.map((icon) => writeFile(
    iconComponentTemplate(icon),
    path.join(DESTINATION_PATH, `${icon.componentName}.jsx`),
  ));
  // Render index.js
  writeBuffer.push(writeFile(
    iconsIndexTemplate(availableIcons),
    path.join(DESTINATION_PATH, 'index.js'),
  ));
  // Return the output writing promise
  return Promise.all(writeBuffer);
};


buildIcons()
  .then(() => console.log('Built icons successful'))
  .catch((e) => { throw e; });
