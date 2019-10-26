const brandList = Object.keys(require('./../.brands.json')) || [];

// Checks if a brand is provided and valid, or uses the first one from brandList
const currentBrand = (()=>{
  const providedBrand = process.env.BRAND;
  if (providedBrand && brandList.includes(providedBrand)) {
    console.log(`Building with provided brand: ${providedBrand}.`);
    return providedBrand;
  } else {
    providedBrand
      ? console.log(
      `Opps, your provided brand: ${providedBrand}, seems not valid.`,
      `Going to use brand: ${brandList[0]} as default.`
      )
      : console.log(`No brand is provided. Using brand: ${brandList[0]} as default.`);
    return brandList[0];
  }
})();

module.exports = currentBrand;