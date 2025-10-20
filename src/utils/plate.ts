export const rxOldRaw = /^[A-Z]{3}\d{4}$/;        
export const rxMerc   = /^[A-Z]{3}\d[A-Z]\d{2}$/;

export type PlateType = 'old' | 'mercosul' | 'invalid';

export function normalizeRaw(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
}

export function maskOldIfApplicable(cleaned7: string) {
  if (rxOldRaw.test(cleaned7)) {
    return `${cleaned7.slice(0, 3)}-${cleaned7.slice(3)}`;
  }
  return cleaned7;
}

export function getPlateType(value: string): PlateType {
  const raw = normalizeRaw(value);
  if (rxOldRaw.test(raw)) return 'old';
  if (rxMerc.test(raw))   return 'mercosul';
  return 'invalid';
}

export function isValidPlate(value: string) {
  const raw = normalizeRaw(value);
  return rxOldRaw.test(raw) || rxMerc.test(raw);
}

export function liveFormat(value: string) {
  return maskOldIfApplicable(normalizeRaw(value));
}
