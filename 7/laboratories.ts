import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./7/laboratories.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}


const example = 
`.......|.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

const parser = (input: string): Array<Array<string>> => input.split('\n').map(row => row.split(''));

const affectValueToSpaceIfExist = (row: Array<string>, index: number, value: string) => {
  if (!row[index]) {
    return;
  }

  row[index] = value;
}


const input = await loadDocument() ?? '';

const halls = parser(input);

let currentRowIndex = 0;
let nextRowIndex = 1;
let splitNumber = 0;

while (nextRowIndex < halls.length) {

  const currentRow = halls[currentRowIndex];
  const nextRow = halls[nextRowIndex];
  for (let i = 0; i < currentRow.length; i++) {
    const space = currentRow[i];
    if (space === '|') {
      let nextSpace = nextRow[i];
      if (nextSpace === '.') {
        affectValueToSpaceIfExist(nextRow, i, '|');
      } else if (nextSpace === '^') {
        affectValueToSpaceIfExist(nextRow, i + 1, '|');
        affectValueToSpaceIfExist(nextRow, i - 1, '|');
        splitNumber += 1;
      }
    }
  }

  currentRowIndex += 1;
  nextRowIndex += 1;
}

console.log(splitNumber);