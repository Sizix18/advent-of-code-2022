/*
Due to the aforementioned Planck lengths, the rope must be quite short; in fact, the head (H) and tail (T) must always be touching
(diagonally adjacent and even overlapping both count as touching)
Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?
*/

import { parseInputFileToStringArray } from '../libraries/inputParser'

type instruction = [string, number]
type coordinate = [number, number]

const convertInputStringsToInstructionPairs = (input: string[]): instruction[] => {
  let instructions: instruction[] = []
  for(let line of input){
    if(line.length > 0) {
      let splitLine = line.split(' ')
      instructions.push([splitLine[0], parseInt(splitLine[1])])
    }
  }
  return instructions
}

const areNeighbors = (prev: coordinate, current: coordinate): boolean => {
  return Math.abs(prev[0] - current[0]) <= 1 && Math.abs(prev[1] - current[1]) <= 1

}

const trackRopeTailPositions = () => {
  let input = parseInputFileToStringArray('./inputs/day9.txt')
  let head: coordinate = [0,0]
  let tail: coordinate = [0,0]
  let tailDestinationSet = new Set()
  let instructions = convertInputStringsToInstructionPairs(input)

  for(let instruction of instructions) {
    let [move, distance] = instruction

    for(let index = 0; index < distance; index++) {
      if(move === 'U') {
        head[0]++
      } else if(move === 'D') {
        head[0]--

      } else if(move === 'L') {
        head[1]--

      } else if(move === 'R') {
        head[1]++
      }

      if(!areNeighbors(head, tail)) {
          for(let i = 0; i < tail.length; ++i) {
            if(Math.abs(head[i] - tail[i]) > 0) {
              tail[i] += Math.sign(head[i] - tail[i])
            }
          }
        }

      if(!tailDestinationSet.has(tail.toString())) {
        tailDestinationSet.add(tail.toString())
      }
    }
  }
  return tailDestinationSet.size
}

console.log(trackRopeTailPositions())



/*
Rather than two knots, you now must simulate a rope consisting of ten knots. 
One knot is still the head of the rope and moves according to the series of motions. 
Each knot further down the rope follows the knot in front of it using the same rules as before.

Simulate your complete series of motions on a larger rope with ten knots. 
How many positions does the tail of the rope visit at least once?
*/


const trackRopeTailPositionsOfAnyLengthRope = (ropeLength: number) => {
  let input = parseInputFileToStringArray('./inputs/day9.txt')

  let rope: coordinate[] = Array.from(Array(ropeLength), () => [0, 0] as [number, number])

  let tailDestinationSet = new Set()
  let instructions = convertInputStringsToInstructionPairs(input)
  let head = rope[0]
  for(let instruction of instructions) {
    let [move, distance] = instruction

    for(let index = 0; index < distance; index++) {
      if(move === 'U') {
        head[0]++
      } else if(move === 'D') {
        head[0]--

      } else if(move === 'L') {
        head[1]--

      } else if(move === 'R') {
        head[1]++
      }
      for(let knotIndex = 1; knotIndex < rope.length; ++knotIndex) {
        let previous = rope[knotIndex - 1]
        let current = rope[knotIndex]

        if(!areNeighbors(previous, current)) {
          for(let i = 0; i < current.length; ++i) {
            if(Math.abs(previous[i] - current[i]) > 0) {
              current[i] += Math.sign(previous[i] - current[i])
            }
          }
        }

      }
      tailDestinationSet.add(rope[ropeLength - 1].toString())

    }
  }
  return tailDestinationSet.size
}

console.log(trackRopeTailPositionsOfAnyLengthRope(10))

