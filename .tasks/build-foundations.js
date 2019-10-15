const StyleDictionary = require('style-dictionary');
const customFilters = require('./style-dictionary/filters');
const customTemplates = require('./style-dictionary/templates');
const brandList = require('./../.brandlist.json') || [];

brandList.map(brand => {
  console.log(`\nBuilding ${brand} design tokens ...`);

  // Create a builder with brand configuration
  const brandConfig = require('./style-dictionary/config')(brand);
  const StyleDictionaryBuilder = StyleDictionary.extend(brandConfig);

  // Register custom filters
  Object.entries(customFilters).forEach(([name, matcher]) => {
    StyleDictionaryBuilder.registerFilter({name, matcher})
  });

  // Register custom templates
  Object.entries(customTemplates).forEach(([name, formatter]) => {
    StyleDictionaryBuilder.registerFormat({name, formatter})
  });

  // Build current brand Design Tokens
  StyleDictionaryBuilder.buildAllPlatforms();
})