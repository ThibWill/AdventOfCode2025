import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./6/math_homework.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}

const inputExample = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const parser = (input:string) => {
  const regex = /^(\s*[\d]+)|\s(\s*[\d]+)|([*+])/g;
  const lines = input.split('\n').map(line => {
    let ret: string[] = [];
    for (const group of line.matchAll(regex)) {
      ret.push(group[1] ?? group[2] ?? group [3]);
    }
    return ret;
  });
  console.log(lines)

  //^(\h*[\d]+)|\h(\h*[\d]+)|([*+])
  // const columnNumbers = lines[0].map((val, index) => lines.map(row => row[index]));
}

const input = await loadDocument() ?? '';
const mathHomework = parser(inputExample);

const computeRow = (row : string[]): number => {
  const sign = row[row.length - 1];
  let total = Number(row[0]);
  for (let i = 1; i < row.length - 1; i++) {
    if (sign === '*') {
      total *= Number(row[i]);
      continue;
    }

    total += Number(row[i]);
  }

  return total;
}

// console.log(mathHomework.map(computeRow).reduce((acc, curr) => acc + curr, 0))