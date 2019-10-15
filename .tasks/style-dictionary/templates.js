// Create a new heading to be used on every template
const currentDate = new Date();
const templateHeading = `
Do not edit directly
Generated on ${currentDate.toGMTString()}
`;


// Template to get a font ready to be used into SCSS
const scssFontTemplate = (dictionary, platform) => {
  const fonts = dictionary.properties.asset.font || {};
  return `
/*
${templateHeading}
*/

$config-path-fonts: 'src/' !default;

${Object.entries(fonts).map(([fontName, fontProps]) => `

$${fontProps.name.name}: "${fontProps.name.value}" !default;
$${fontProps.fallback.name}: ${fontProps.fallback.value} !default;

@font-face {
  font-family: $${fontProps.name.name};
  font-style: normal;
  font-weight: ${fontProps.weight.value};
  font-display: fallback;
  src: local('${fontProps.name.value}'),
  url('#{$config-path-fonts}${fontProps.woff2.value}') format('woff2'), /* Super Modern Browsers */
  url('#{$config-path-fonts}${fontProps.woff.value}') format('woff'); /* Modern Browsers */
} 
`).join('')}
`}

module.exports = {
  "scss/font": scssFontTemplate
}