/*const inputExample = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
const input = "16100064-16192119,2117697596-2117933551,1-21,9999936269-10000072423,1770-2452,389429-427594,46633-66991,877764826-877930156,880869-991984,18943-26512,7216-9427,825-1162,581490-647864,2736-3909,39327886-39455605,430759-454012,1178-1741,219779-244138,77641-97923,1975994465-1976192503,3486612-3602532,277-378,418-690,74704280-74781349,3915-5717,665312-740273,69386294-69487574,2176846-2268755,26-45,372340114-372408052,7996502103-7996658803,7762107-7787125,48-64,4432420-4462711,130854-178173,87-115,244511-360206,69-86";

type IDsRange = {
  start: number;
  end: number;
}

const parser = (input: string): IDsRange[] => {
  const ranges = input.split(',');

  return ranges.map((range): IDsRange => {
    const [start, end] = range.split('-');
    return {
      start: Number(start),
      end: Number(end)
    };
  });
}

const generateAllWrongIDs = (maxLengthId: number): number[] => {
  const half = maxLengthId / 2;
  const wrongIDs: Set<number> = new Set();
  for (let i = 1; i < Math.pow(10, half); i++) {
    let wrongId = `${i}`;
    while (wrongId.length < maxLengthId) {
      wrongId += `${i}`;
      if (wrongId.length <= maxLengthId) {
        wrongIDs.add(Number(wrongId));
      }
    }
  }
  return [...wrongIDs];
}

const determineMaxLength = (ranges: IDsRange[]): number => {
  const ends = ranges.map(ranges => ranges.end)
  const max = Math.max(...ends);
  return String(max).length % 2 === 1 ? String(max).length - 1 : String(max).length;
}

const ranges = parser(input);
const maxLengthID = determineMaxLength(ranges);
const possibleWrongIds = generateAllWrongIDs(maxLengthID);

const wrongIds = new Set<number>();
for (const range of ranges) {
  for (const possibleWrongID of possibleWrongIds) {
    if (possibleWrongID >= range.start && possibleWrongID <= range.end) {
      wrongIds.add(possibleWrongID);
    }
  }
}

console.log([...wrongIds].reduce((acc: number, curr: number) => acc += curr, 0));*/