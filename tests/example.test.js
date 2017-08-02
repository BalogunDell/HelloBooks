import { assert } from 'chai';

const sum = (a, b) => {
  return a + b;
};

describe('Should add 2 vars', () => {
  it('should return positive integer', () => {
    assert.equal(sum(2, 3), 5);  
  });
})