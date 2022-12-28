/*
You'd like to reach E, but to save energy, you should do it in as few steps as possible. 
During each step, you can move exactly one square up, down, left, or right. 
To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; 
that is, if your current elevation is m, you could step to elevation n, but not to elevation o. 
(This also means that the elevation of the destination square can be much lower than the elevation of your current square.)

What is the fewest steps required to move from your current position to the location that should get the best signal?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"

const START_INDEX = 'S'.charCodeAt(0)
const DESTINATION_INDEX = 'E'.charCodeAt(0)
const LOWEST_ELEVATION_INDEX = 'a'.charCodeAt(0)
const HIGHEST_ELEVATION_INDEX = 'z'.charCodeAt(0)
const findStartAndEndAndGenerateMap = (inputList: string[]): [number[][], [number, number], [number, number]] => {
  let map: number[][] = []
  let start: [number, number] = [0,0]
  let end: [number, number] = [0,0]
  for(let [index, line] of inputList.entries()) {
    if(line) {
      if(line.includes('S')){
        start = [index, line.indexOf('S')]
      }
      if(line.includes('E')) {
        end = [index, line.indexOf('E')] 
      }

      map.push(line.split("").map((value) => value.charCodeAt(0)))
    }
  }
  return [map, start, end]
}

const getNeighbors = (location: [number, number], map: number[][]): [number, number][]=> {
  let [x,y] = location
  return [[x-1,y], [x+1,y],[x,y-1],[x,y+1]].filter(([x,y]) => typeof map[x]?.[y] !== 'undefined') as [number, number][]

}

const isLocationTraversable = (currentElevationIndex: number, consideredLocationElevationIndex: number) => {
  return (consideredLocationElevationIndex <= currentElevationIndex + 1 && consideredLocationElevationIndex >= LOWEST_ELEVATION_INDEX) ||
    (currentElevationIndex === START_INDEX && (consideredLocationElevationIndex === LOWEST_ELEVATION_INDEX || consideredLocationElevationIndex === LOWEST_ELEVATION_INDEX + 1)) ||
    (currentElevationIndex === HIGHEST_ELEVATION_INDEX && consideredLocationElevationIndex === DESTINATION_INDEX)
}

const shortestPath = (map: number[][], starts: [number, number][], destination: [number, number]): number => {
  const visited = new Set<string>([starts[0].toString()])
  let queue: [[number, number], number][] = starts.map(start => [start, 0])
  while(queue.length > 0) {
    let [current, distance] = queue.shift() as [[number, number], number]
    if(current.toString() == destination.toString()) return distance
    let neighbors = getNeighbors(current, map)
    for(let neighbor of neighbors) {
      if(!visited.has(neighbor.toString()) && isLocationTraversable(map[current[0]][current[1]], map[neighbor[0]][neighbor[1]])) {
        visited.add(neighbor.toString())
        queue.push([neighbor, distance + 1])
      }
    }
  }
  return - 1
}

const findShortestPathFromStartUpTheMountain = () => {
  let inputList = parseInputFileToStringArray('./inputs/day12.txt')
  let [map, start, end] = findStartAndEndAndGenerateMap(inputList)
  return shortestPath(map, [start], end)
}



console.log(findShortestPathFromStartUpTheMountain())


/*
To maximize exercise while hiking, the trail should start as low as possible: elevation a. 
The goal is still the square marked E. However, the trail should still be direct, taking the fewest steps to reach its goal. 
So, you'll need to find the shortest path from any square at elevation a to the square marked E.

What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal?

*/


const getListOfAllLowestElevationLocations = (map: number[][]): [number, number][] => {
  let lowestElevations: [number, number][] = []
  for(let row in map) {
    for(let column in map[row]) {
      if(map[row][column] === START_INDEX || map[row][column] === LOWEST_ELEVATION_INDEX) lowestElevations.push([parseInt(row), parseInt(column)])
    }
  }
  return lowestElevations
}

const findShortestPathFromLowestElevationUpTheMountain = () => {
  let inputList = parseInputFileToStringArray('./inputs/day12.txt')
  let [map, start, end] = findStartAndEndAndGenerateMap(inputList)
  let starts = getListOfAllLowestElevationLocations(map)
  return shortestPath(map, [start], end)


}

console.log(findShortestPathFromLowestElevationUpTheMountain())
