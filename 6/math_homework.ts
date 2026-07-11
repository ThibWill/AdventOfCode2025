import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./6/math_homework.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents;
  } catch (err: any) {
    console.error(err.message);
  }
}

const inputExample = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `;

const inputExample2 =
`123 1855 1247 64
 45  896 3    23
  6   12 4    314
*   +    *    +  `;

const parser = (input: string) => {
  	const lines = input.split('\n');
  	const lastLine = lines.at(-1) || "";

	const matches = [...lastLine.matchAll(/([*+]\s*)/g)].map(m => m[1]);
	const groupsLength = matches.map((match, index) => match.length - (index < matches.length - 1 ? 1 : 0));

	const worksheetInfoLines: Array<Array<string>> = [];
	for (let i = 0; i < lines.length - 1; i++) {
		const line = lines[i];
		let startIndex = 0;
		worksheetInfoLines[i] = [];
		for (let j = 0; j < groupsLength.length; j++) {
			worksheetInfoLines[i].push(line.slice(startIndex, startIndex + groupsLength[j]))
			startIndex += groupsLength[j] + 1;
		}
	}

	const worksheetInfo = matches.map((match, index) => {
		const column = [];
		for (const worksheetInfoLine of worksheetInfoLines) {
			column.push(worksheetInfoLine[index]);
		}

		const length = match.length - (index < matches.length - 1 ? 1 : 0);
		const reordered: Array<string> = Array(length).fill(Array.from([]));
		for (let i = 0; i < length; i++) {
			for (const problem of column)
			{
				reordered[i] += problem[i];
			}
		}

		return {
			problems: reordered.map(r => Number(r)),
			sign: match.trim()
		};
	})

	return worksheetInfo;
}

const input = await loadDocument() ?? '';
const mathHomework = parser(input);

const computeRow = (row : { problems: Array<number>; sign: string; }): number => {
	const { problems, sign } = row;
	let total = problems[0];
	for (let i = 1; i < problems.length; i++) {
		if (sign === '*') {
			total *= problems[i];
      		continue;
		}
		total += problems[i];
    }
  	return total;
}

console.log(mathHomework.map(computeRow).reduce((acc, curr) => acc + curr, 0));