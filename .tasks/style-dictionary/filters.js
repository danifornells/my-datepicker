
const isFont = (prop) => prop.attributes.category === 'asset' && prop.attributes.type === 'font';

module.exports = {
  isFont,
  isNotFont: (prop) => !isFont(prop),
};
