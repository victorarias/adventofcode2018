const fs = require("fs");
const assert = require("assert");

function reasonableReadFileIntoNumbers(path) {
  return fs
    .readFileSync(path, { encoding: "utf-8" })
    .toString()
    .trim()
    .split("\n")
    .map(i => parseInt(i));
}

function solvePart1(numbers) {
  return numbers.reduce((frequency, number) => {
    return frequency + number;
  }, 0);
}

function solvePart2(originalNumbers) {
  const frequencies = new Set();
  let numbers = originalNumbers.slice();
  let currentFrequency = 0;

  do {
    frequencies.add(currentFrequency);
    const frequency = numbers.shift();
    currentFrequency += frequency;

    if (numbers.length === 0) {
      numbers = originalNumbers.slice();
    }
  } while (!frequencies.has(currentFrequency));

  return currentFrequency;
}

const actualFile = reasonableReadFileIntoNumbers("./01/data");
const testFile = reasonableReadFileIntoNumbers("./01/testData");

assert(
  solvePart1(testFile) == 4,
  `test data failed with ${solvePart1(testFile)}`
);

assert(
  solvePart1(actualFile) == 416,
  `you broke solvePart1 (its returning ${solvePart1(actualFile)})`
);

assert(
  solvePart2(testFile) == 10,
  `test data failed with ${solvePart2(testFile)}`
);

console.log(solvePart2(actualFile));
