import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadDocument() {
  try {
    const filePath = resolve('./1/lock.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents.trim()
  } catch (err) {
    console.error(err.message);
  }
}

const dialRotations ="L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";


type Rotation = {
  direction: "LEFT" | "RIGHT";
  turns: number
}

// enum Sign {
//   PLUS,
//   MINUS
// } 

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
  // let currentSign = Sign.PLUS;

  const detectZeros = (currentDialPosition: number) => {
    if (currentDialPosition !== 0) {
      return;
    }

    countZeros += 1;
  }
  
  const getCountOfZeros = () => countZeros;

  return {
    detectZeros,
    getCountOfZeros
  }
}

const doc = await loadDocument();
const rotations = parser(dialRotations);

let currentDialPosition = 50;
let zerosCounterInstance = zerosCounter();
for (const rotation of rotations)
{
  if (rotation.direction === "LEFT") {
    currentDialPosition -= rotation.turns;
  } else {
    currentDialPosition += rotation.turns;
  }

  currentDialPosition = currentDialPosition % 100;
  if (currentDialPosition < 0) {
    currentDialPosition = 100 + currentDialPosition;
  }

  zerosCounterInstance.detectZeros(currentDialPosition)
}

console.log(zerosCounterInstance.getCountOfZeros());