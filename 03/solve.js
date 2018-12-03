const fs = require("fs");
const assert = require("assert");

function reasonableReadFileIntoLines(path) {
  return fs
    .readFileSync(path, { encoding: "utf-8" })
    .toString()
    .trim()
    .split("\n");
}

function assertEquals(actual, expected) {
  assert(expected == actual, `expected ${expected}, got ${actual}`);
}

function lineToRectagle(line) {
  const toInt = i => parseInt(i);
  const [id, sizes] = line.split("@");
  const [margins, size] = sizes.split(":");
  const [leftMargin, topMargin] = margins.split(",").map(toInt);
  const [hLength, vLength] = size.split("x").map(toInt);

  return {
    leftMargin,
    topMargin,
    hLength,
    vLength,
    id: id.substring(1).trim()
  };
}

function rectangleToPositions(rectangle) {
  const positions = [];
  const startHPos = rectangle.leftMargin;
  const startVPos = rectangle.topMargin;

  for (let i = 0; i < rectangle.hLength; i++) {
    for (let j = 0; j < rectangle.vLength; j++) {
      positions.push({ x: startHPos + i, y: startVPos + j, id: rectangle.id });
    }
  }

  return positions;
}

function mergeRectangleIntoGrid(rectangle, grid) {
  const positions = rectangleToPositions(rectangle);
  positions.forEach(({ x, y, id }) => {
    if (grid[x] == undefined) {
      grid[x] = [];
    }
    if (grid[x][y]) {
      const elem = grid[x][y];
      elem.count += 1;
      elem.ids.push(id);
    } else {
      const elem = { ids: [id], count: 1 };
      grid[x][y] = elem;
    }
  });
  return grid;
}

function solvePart1(rectangles) {
  const grid = [];
  rectangles.forEach(rect => mergeRectangleIntoGrid(rect, grid));

  return grid.reduce(
    (count, line) => line.filter(c => c.count > 1).length + count,
    0
  );
}

function solvePart2(rectangles) {
  const grid = [];
  rectangles.forEach(rect => mergeRectangleIntoGrid(rect, grid));

  const allPos = grid.flat();
  const [aloneIds, overlappedIds] = allPos.reduce(
    ([alone, overlapped], { ids }) => {
      if (ids.length == 1) {
        alone.add(ids[0]);
      } else {
        ids.forEach(overlapped.add.bind(overlapped));
      }
      return [alone, overlapped];
    },
    [new Set(), new Set()]
  );

  return [...aloneIds].filter(x => !overlappedIds.has(x))[0];
}

const testRectangles = reasonableReadFileIntoLines("03/test_data_1").map(
  lineToRectagle
);
assertEquals(solvePart1(testRectangles), 4);

const officialRectangles = reasonableReadFileIntoLines("03/data").map(
  lineToRectagle
);
assertEquals(solvePart1(officialRectangles), 111935);

assertEquals(solvePart2(testRectangles), "3");
console.log(solvePart2(officialRectangles));
