// Create a new heading to be used on every template
const currentDate = new Date();
const templateHeading = `
Do not edit directly
Generated on ${currentDate.toGMTString()}
`;

module.exports = templateHeading;
