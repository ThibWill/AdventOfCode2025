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

const isFreshIngredient = (ingredient: number, ranges: IDRange[]): number => {
  for (const range of ranges) {
    if (range.start <= ingredient && range.end >= ingredient) {
      return 1;
    }
  }
  return 0;
}

const input = await loadDocument() ?? '';

const { ranges, ingredients } = parser(input);

let freshIngredients = 0;
for (const ingredient of ingredients) {
  freshIngredients += isFreshIngredient(ingredient, ranges);
}

console.log(freshIngredients)