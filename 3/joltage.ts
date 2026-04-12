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

const findEligibleJoltagesLeftValue = (battery: string) => {
  const batteryLeftPart = battery.substring(0, battery.length - 1);
  return batteryLeftPart.split('').map(joltage => Number(joltage));
}

const findEligibleJoltagesRightValue = (battery: string, indexLeftValue: number) => {
  const batteryLeftPart = battery.substring(indexLeftValue + 1, battery.length);
  return batteryLeftPart.split('').map(joltage => Number(joltage));
}

const findBatteryLargestJoltage = (battery: string) => {
  const eligibleVoltagesLeftValue = findEligibleJoltagesLeftValue(battery);
  const leftJoltageIndex = findMaxNumberIndex(eligibleVoltagesLeftValue);
  const eligibleVoltagesRightValue = findEligibleJoltagesRightValue(battery, leftJoltageIndex);
  const rightJoltageIndex = findMaxNumberIndex(eligibleVoltagesRightValue) + leftJoltageIndex + 1;
  
  return Number(`${battery[leftJoltageIndex]}${battery[rightJoltageIndex]}`);
}

const banks = await loadDocument() || '';
const batteries = parser(banks);

console.log(batteries.map(battery => findBatteryLargestJoltage(battery)).reduce((acc, curr) => acc += curr, 0))