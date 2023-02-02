/*

Using your scan, simulate the falling sand. How many units of sand come to rest before sand starts flowing into the abyss below?

*/

import { parseInputFileToStringArray } from "../libraries/inputParser"


const generateMap = (inputList: string[], floor: boolean): [Map<string, '#' | 'o'>, number] => {
  const map = new Map<string, '#' | 'o'>();
  let lowestPoint = 0
  inputList.forEach((value) => {
    const coords = value.split(' -> ').map(coord => coord.split(',').map(Number))
    let [x, y] = coords[0];
		map.set(`${x},${y}`, '#');
    for (const [x2, y2] of coords.slice(1)) {
			if (y2 > lowestPoint) lowestPoint = y2;
			while (x !== x2 || y !== y2) {
				if (x !== x2) x += x < x2 ? 1 : -1;
				else if (y !== y2) y += y < y2 ? 1 : -1;
				map.set(`${x},${y}`, '#');
			}
		}
  })

  if(floor) {
    lowestPoint += 2
    for(let x= -1000; x < 1000;  ++x) map.set(`${x},${lowestPoint}`, '#')
  }

  return [map, lowestPoint]
}

const simulateSand = (map: Map<string, '#' | 'o'>, lowestPoint: number) => {
  sand:
  // eslint-disable-next-line no-constant-condition
  while(true) {
    let [x,y] = [500, 0]
    if(map.get(`${x},${y}`) === 'o') break
    // eslint-disable-next-line no-constant-condition
    while(true) {
      if(y>= lowestPoint) {
        map.delete(`${x},${y}`)
        break sand
      } else if(map.get(`${x},${y}`) === undefined) {
        map.set(`${x},${y}`, 'o')
      } else if(map.get(`${x},${y+1}`) === undefined) {
        map.delete(`${x},${y}`)
        y++
        map.set(`${x},${y}`, 'o')
      } else if(map.get(`${x-1},${y+1}`) === undefined) {
        map.delete(`${x},${y}`)
        x--
        y++
        map.set(`${x},${y}`, 'o')
      } else if(map.get(`${x+1},${y+1}`) === undefined) {
        map.delete(`${x},${y}`)
        x++
        y++
        map.set(`${x},${y}`, 'o')
      } else break
    }
  }
  return map
}

const getRestingSandCount = () => {
  const inputList = parseInputFileToStringArray('./inputs/day14.txt').filter(Boolean)
  // eslint-disable-next-line prefer-const
  let [map, lowestPoint] = generateMap(inputList, false)

  map = simulateSand(map, lowestPoint)
  const values = [...map.values()]
  const count = values.filter(v => v === 'o').length
  return count
}

console.log(getRestingSandCount())


/*

You don't have time to scan the floor, so assume the floor is an infinite horizontal line with a y coordinate 
equal to two plus the highest y coordinate of any point in your scan.

Using your scan, simulate the falling sand until the source of the sand becomes blocked. How many units of sand come to rest?
*/

const getRestingSandCountWithFloor = () => {
    const inputList = parseInputFileToStringArray('./inputs/day14.txt').filter(Boolean)
  // eslint-disable-next-line prefer-const
  let [map, lowestPoint] = generateMap(inputList, true)

  map = simulateSand(map, lowestPoint)
  const values = [...map.values()]
  const count = values.filter(v => v === 'o').length
  return count
}

console.log(getRestingSandCountWithFloor())
