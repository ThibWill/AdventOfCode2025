import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./5/cafeteria.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}

const inputExample = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

type IDRange = {
  start: number,
  end: number
}


const parser = (input: string): { ranges: IDRange[], ingredients: number[]} => {
  const parts = input.split('\n\n');
  const ranges = parts[0].split('\n').map(range => ({ start: Number(range.split('-')[0]), end: Number(range.split('-')[1]) }))
  const ingredients = parts[1].split('\n').map(ingredient => Number(ingredient));

  return {
    ranges,
    ingredients
  }
}

const input = await loadDocument() ?? '';

const { ranges } = parser(inputExample);

for (let i = 0; i < ranges.length; i++) {
  const range = ranges[i];
  for (let j = 0; j < ranges.length; j++) {
    if (i === j) {
      continue;
    }

    const otherRange = ranges[j];
    if (range.start >= otherRange.start && range.end <= otherRange.end) {
      range.start = -1;
      range.end = -1;
      continue;
    }

    if (range.start <= otherRange.end && range.start >= otherRange.start) {
      range.start = otherRange.end + 1;
    }

    if (range.end >= otherRange.start && range.end <= otherRange.end) {
      range.end = otherRange.start - 1;
    }
  }
}

const freshIDsNb = ranges.map((range) => {
  if (range.start === -1 || range.end === -1) {
    return 0;
  }

  return range.end - range.start + 1
}).reduce((acc, curr) => acc += curr, 0);

console.log(freshIDsNb)
