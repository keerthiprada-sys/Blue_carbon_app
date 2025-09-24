function calcCarbonAbsorption(hectares) {
  const biomassPerHectare = 150; // tons CO2 per year (example constant)
  return hectares * biomassPerHectare;
}

module.exports = calcCarbonAbsorption;
    