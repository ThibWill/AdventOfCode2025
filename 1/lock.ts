import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./1/lock.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err: any) {
    console.error(err.message);
  }
}

const dialRotations ="L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";


type Rotation = {
  direction: "LEFT" | "RIGHT";
  turns: number
} 

const parser = (input: string) : Rotation[] => {
  const rotations: Rotation[] = input.split("\n").map(info => {
    
    const direction = info[0] === "L" ? "LEFT" : "RIGHT";
    const turns = Number(info.substring(1));

    return {
      direction,
      turns
    };
  });

  return rotations;
}

const zerosCounter = () => {
  let countZeros = 0;
  
  const getCountOfZeros = () => countZeros;

  const addZeros = (nbZeros: number) => countZeros += nbZeros;

  return {
    getCountOfZeros,
    addZeros
  }
}

// const doc = await loadDocument();
const rotations = parser(dialRotations);

let currentDialPosition = 50;
let zerosCounterInstance = zerosCounter();
for (const rotation of rotations)
{
  if (rotation.direction === "LEFT" && currentDialPosition !== 0) {
    currentDialPosition = 100 - currentDialPosition;
  }

  currentDialPosition += rotation.turns;
  const fullTurns = Math.floor(Math.abs(currentDialPosition / 100));
  currentDialPosition = currentDialPosition % 100;

  if (rotation.direction === "LEFT" && currentDialPosition !== 0) {
    currentDialPosition = 100 - currentDialPosition;
  }

  zerosCounterInstance.addZeros(fullTurns)
}

console.log(zerosCounterInstance.getCountOfZeros());