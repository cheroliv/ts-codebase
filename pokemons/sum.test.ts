import { sum } from './src/sum';
import { describe } from '@jest/globals';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';


describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});