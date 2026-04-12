import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./3/banks.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

const parser = (input: string) => input.split("\n");

const findMaxNumberIndex = (joltages: number []) => {
  let maxNumberIndex = 0;
  let maxValue = 0;
  for (let i = 0; i < joltages.length; i++) {
    if (joltages[i] <= maxValue) {
      continue;
    }

    maxNumberIndex = i;
    maxValue = joltages[i];
  }

  return maxNumberIndex;
}

const extractEligibleJoltagesValues = (battery: string, startIndex: number, endIndex: number) => {
  const batteryLeftPart = battery.substring(startIndex, endIndex);
  return batteryLeftPart.split('').map(joltage => Number(joltage));
}

const findBatteryLargestJoltage = (battery: string) => {
  let offsetLeft = 0;
  let offsetRight = 0;
  const highestJoltageIndexes = [];
  for (let i = 11; i >= 0; i--) 
  {
    offsetRight = battery.length - i;
    const eligibleVoltagesLeftValue = extractEligibleJoltagesValues(battery, offsetLeft, offsetRight);
    const joltageIndex = findMaxNumberIndex(eligibleVoltagesLeftValue);
    highestJoltageIndexes.push(joltageIndex + offsetLeft);
    offsetLeft += joltageIndex + 1;
  }
 
  
  return Number(highestJoltageIndexes.map(highestJoltageIndex => battery[highestJoltageIndex]).join(''));
}

const banks = await loadDocument() || '';
// const batteries = parser(exampleInput);
const batteries = parser(banks);

console.log(batteries.map(battery => findBatteryLargestJoltage(battery)).reduce((acc, curr) => acc += curr, 0))