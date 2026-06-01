export function calculateFuelCost(
  distanceKm: number,
  consumptionL100km: number,
  pricePerLitre: number,
  passengers: number = 1
) {
  const totalLitres = (distanceKm / 100) * consumptionL100km;
  const totalCost = totalLitres * pricePerLitre;
  return {
    totalLitres,
    totalCost,
    costPerPassenger: totalCost / Math.max(1, passengers),
  };
}

export function calculateTripTime(distanceKm: number, speedKmh: number, stopMinutes: number = 0) {
  const driveHours = distanceKm / speedKmh;
  const totalHours = driveHours + stopMinutes / 60;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return { totalHours, hours, minutes };
}

export function lPer100kmToMPG(l100km: number, gallonType: "us" | "uk" = "us") {
  const litresPerGallon = gallonType === "us" ? 3.78541 : 4.54609;
  return 100 / l100km * (litresPerGallon / 1.60934);
}

export function mpgToL100km(mpg: number, gallonType: "us" | "uk" = "us") {
  const litresPerGallon = gallonType === "us" ? 3.78541 : 4.54609;
  return 100 / (mpg * (litresPerGallon / 1.60934));
}

export function litresPerGallon(gallonType: "us" | "uk") {
  return gallonType === "us" ? 3.78541 : 4.54609;
}

export function kmToMiles(km: number) { return km * 0.621371; }
export function milesToKm(miles: number) { return miles * 1.60934; }
