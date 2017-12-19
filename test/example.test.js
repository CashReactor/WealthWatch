const example = require('../server/example.js');

test('adds 1 + 2 to equal 3', () => {
  expect(example.sum(1, 2)).toBe(3);
});

test('adds 2 + 3 to equal 5', () => {
  expect(example.sum(2, 3)).toBe(5);
})