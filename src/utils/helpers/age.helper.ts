const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;
export const ageCalculator = (bday: string): number => {
  const today = new Date();
  const birthDate = new Date(bday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const birthDayCalculator = (age: number): string => {
  const ageInMillis = age * YEAR_IN_MILLISECONDS;
  // I substracted 6 months in addition on the assmption that the user has reached his birthday at least 6 monthss ago
  return new Date(new Date().getTime() - ageInMillis - YEAR_IN_MILLISECONDS / 2)
    .toISOString()
    .split('T')[0];
};
