import { test, expect } from '@jest/globals';
import { isIntegerString, isValidIntegerString } from './validation';

test('Test if input is an integer string', () => {
  expect(isIntegerString('1')).toBe(true);
  expect(isIntegerString('2')).toBe(true);
  expect(isIntegerString('1.1')).toBe(false);
  expect(isIntegerString('45.05')).toBe(false);
});

test('Check if integer string fits boundaries', () => {
  expect(isValidIntegerString('1', 0, 10)).toEqual(true);
  expect(isValidIntegerString('16', 0, 10)).toEqual(false);
});
