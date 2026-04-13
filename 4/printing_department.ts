import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./4/printing_department.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}

const inputExample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const parser = (input: string): string[][] => {
  return input.split('\n').map(row => row.split(''));
}

const input = await loadDocument() ?? '';

const printingDepartment = parser(input);

const rowLength = printingDepartment[0].length;
const columnLength = printingDepartment.length;
const neighbors = [[1, 1], [-1, 1], [1, -1], [0, 1], [1, 0], [0, -1], [-1, 0], [-1, -1]];

let accessibleRolls = 0;
let previousAccessibleRolls = null;

while (previousAccessibleRolls !== accessibleRolls) {
  previousAccessibleRolls = accessibleRolls;

  for (let i = 0; i < columnLength; i++) {
    const column = printingDepartment[i];
    for (let j = 0; j < rowLength; j++) {
      const place = column[j];
      if (place !== '@') {
        continue;
      }

      let paperRollsAround = 0;
      for (let neighbor of neighbors) {
        const rowDiff = neighbor[0];
        const columnDiff = neighbor[1];

        if (printingDepartment?.[i + columnDiff]?.[j + rowDiff] === '@') {
          paperRollsAround += 1;
        }
      }

      if (paperRollsAround < 4) {
        accessibleRolls += 1;
        printingDepartment[i][j] = '.';
      }
    }
  }
}

console.log(accessibleRolls);
