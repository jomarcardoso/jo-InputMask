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
    const currentValue = value[valuePosition];
    if (!currentValue) return '';
    const newValue = maskApplier(currentValue);
    valuePosition += 1;
    if (newValue !== '') {
      return newValue;
    }
    return applyMask(maskApplier);
  }

  return arrayMask.reduce((previousValue, currentSimbol, index) => {
    if (valuePosition === value.length) return previousValue;
    console.log(valuePosition)
    const maskApplier = simbols[currentSimbol];
    if (!maskApplier) return concatenator(previousValue, currentSimbol);

    const newValue = applyMask(maskApplier);
    return `${previousValue}${newValue}`;
  }, '');
}

export function toMask(value, mask) {
  function concatenator(string, symbol) {
    return `${string}${symbol}`;
  }

  return iterationMask(value, mask, concatenator);
}

export function toUnMask(value, mask) {
  function concatenator(string) {
    return string;
  }

  return iterationMask(value, mask, concatenator);
}
