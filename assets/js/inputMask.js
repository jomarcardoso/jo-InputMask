function digitMask(value) {
  const digitRegex = /\d/;
  if (digitRegex.test(value)) return value;
  return '';
}

function characterMask(value) {
  const characterRegex = /[\w|záàâãéèêíïóôõöúçñ]/i;
  if (characterRegex.test(value)) return value;
  return '';
}

function upperCaseMask(value) {
  return characterMask(characterMask(value).toUpperCase());
}

function lowerCaseMask(value) {
  return characterMask(characterMask(value).toUpperCase());
}

const simbols = {
  '9': digitMask,
  // ' ': /\s/,
  '[a-zA-z]': characterMask,
  'A': upperCaseMask,
  'a': lowerCaseMask,
}

function iterationMask(value, mask, concatenator) {
  const arrayMask = Array.from(mask);
  let valuePosition = 0;

  function applyMask(maskApplier) {
    const newValue = maskApplier(value[valuePosition]);
    valuePosition += 1;
    if (newValue !== '') {
      return newValue;
    }
    return applyMask(maskApplier);
  }

  return arrayMask.reduce((previousValue, currentSimbol, index) => {
    const maskApplier = simbols[currentSimbol];
    if (!maskApplier) return concatenator(previousValue, currentSimbol);

    const newValue = applyMask(maskApplier);
    return `${previousValue}${newValue}`;
  }, '');
}

export function mask(value, mask) {
  function concatenator(string, symbol) {
    return `${string}${symbol}`;
  }

  return iterationMask(value, mask, concatenator);
}

export function unMask(value, mask) {
  function concatenator(string) {
    return string;
  }

  return iterationMask(value, mask, concatenator);
}
