export const removeDiacritics = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const makeUnicodeWordRegex = (phrase: string) => {
  const body = escapeRegExp(phrase).replace(/\s+/g, "\\s*");
  try {
    return new RegExp(`(?<!\\p{L})(${body})(?!\\p{L})`, "iu");
  } catch {
    return new RegExp(`(?:^|[^\\p{L}])(${body})(?!\\p{L})`, "iu");
  }
};

export const makeAsciiWordRegex = (phrase: string) => {
  const body = escapeRegExp(phrase).replace(/\s+/g, "\\s*");
  try {
    return new RegExp(`(?<![a-z0-9])(${body})(?![a-z0-9])`, "i");
  } catch {
    return new RegExp(`(?:^|[^a-z0-9])(${body})(?![a-z0-9])`, "i");
  }
};
