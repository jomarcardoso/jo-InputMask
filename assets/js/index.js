import { unMask, mask } from './inputMask.js';

console.log(mask('5188auikkkkk  7654321', '(99) 99999-9999'));
console.log(mask('93800000', '99.999-999'));
console.log(mask('01234567890', '999.999.999-99'));
console.log(mask('abcd999', 'AAAA999'));

console.log(unMask('(51) 88765-4321', '(99) 99999-9999'));
console.log(unMask('93.890-345', '99.999-999'));
console.log(unMask('012.345.678-90', '999.999.999-99'));
console.log(unMask('abcd999', 'AAAA999'));
