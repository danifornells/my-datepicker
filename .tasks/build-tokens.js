/* eslint-disable import/no-extraneous-dependencies, no-console, global-require */
const StyleDictionary = require('style-dictionary');
const customTemplates = require('./style-dictionary/templates');
const customFilters = require('./style-dictionary/filters');
const keywords = require('./style-dictionary/keywords').KEYWORDS;
const keywordFilters = require('./style-dictionary/keywords').FILTERS(keywords);
const brand = require('./brand-resolver');

console.log(`\nBuilding ${brand} design tokens ...`);

// Create a builder with brand configuration
const brandConfig = require('./style-dictionary/config')(brand);
const StyleDictionaryBuilder = StyleDictionary.extend(brandConfig);

// Register custom and keyword filters
Object.entries(customFilters).forEach(([name, matcher]) => {
  StyleDictionaryBuilder.registerFilter({ name, matcher });
});
Object.entries(keywordFilters).forEach(([name, matcher]) => {
  StyleDictionaryBuilder.registerFilter({ name, matcher });
});

// Register custom templates
Object.entries(customTemplates).forEach(([name, formatter]) => {
  StyleDictionaryBuilder.registerFormat({ name, formatter });
});

// Build current brand Design Tokens
StyleDictionaryBuilder.buildAllPlatforms();
