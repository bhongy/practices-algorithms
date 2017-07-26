// @flow

import isPalindrome from './valid-palindrome';

// data from http://www.palindromelist.net
describe('Valid Palindrome', () => {
  it('should return `true` for the palindrome inputs', () => {
    [
      '',
      '12345678987654321',
      'A man, a plan, a canal: Panama',
      'A Santa dog lived as a devil God at NASA.',
      '“Dennis and Edna dine,” said I, as Enid and Edna sinned.',
      'Dogma in my hymn: I am God.',
      'He won! Killer! Rad Darrell I know, eh?',
      'Madam in Eden, I’m Adam.',
      'No lemon, no melon.',
      'No lemons, no melon.',
      '“Reviled did I live,” said I, “as evil I did deliver!”',
      'Wassamassaw',
    ].forEach((input) => {
      expect(isPalindrome(input)).toBe(true);
    });
  });

  it('should return `false` for the non-palindrome inputs', () => {
    [
      '1234123',
      'Madam in EEden, I’m Adam.',
      'Simple phrase that is not a palindrome.',
    ].forEach((input) => {
      expect(isPalindrome(input)).toBe(false);
    });
  });
});
