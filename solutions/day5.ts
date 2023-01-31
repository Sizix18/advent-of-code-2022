/*
The Elves don't want to interrupt the crane operator during this delicate procedure, 
but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input)

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"


const extractContainerTable = (inputList: string[]): string[] => {
  const containerStrings: string[] = []
  let line = inputList[0]
  while(line !== ""){    

    const containerString = inputList.shift()
    if(containerString !== undefined) {
      containerStrings.push(containerString)
      line = inputList[0]
    }
  }
  inputList.shift()
  return containerStrings
}

const createContainerArrayFromContainerStringTable = (containerStrings: string[]): string[][] => {
  const containerArray: string[][] = []

  const containerLength = (containerStrings[0].length + 1)/ 4
  for(let i = 0; i < containerLength; ++i) {
    containerArray.push([])
  }

  containerStrings.pop()

  for(const line of containerStrings) {
    for(let contentsIndex = 1; contentsIndex < line.length - 1; contentsIndex += 4) {
      if(line[contentsIndex] !== " ") {
        containerArray[((contentsIndex - 1) / 4)].push(line[contentsIndex])

      }
    }
  }
  return containerArray
}

const extractContainerMovementNumbers = (orderStrings: string[]): number[][] => {
  const orders: number[][] = []

  for(const order of orderStrings) {
    const numberArray = order.match(/[0-9]+/gm)?.map(Number)
    if(numberArray?.length === 3) {
      orders.push(numberArray)
    }

  }
  return orders
}


const containerOrganizer = () => {
  const inputList: string[] = parseInputFileToStringArray('./inputs/day5.txt')

  const containerStrings = extractContainerTable(inputList)
  const containerArray = createContainerArrayFromContainerStringTable(containerStrings)
  const movementNumbers = extractContainerMovementNumbers(inputList)

  for(const movementArray of movementNumbers) {
    const [ movementCount, moveFrom, moveTo ] = movementArray
    for(let move = 0; move < movementCount; ++move) {
      const contents = containerArray[moveFrom - 1].shift()
      if(contents !== undefined) {
        containerArray[moveTo - 1].unshift(contents)
      }
    }
  }

  let answer = ""
  for(const array of containerArray) {
    answer += (array[0])
  }
  return answer
  
}


console.log(containerOrganizer())


/* 
The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder,
and the ability to pick up and move multiple crates at once.
Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. 
After the rearrangement procedure completes, what crate ends up on top of each stack?
*/


const containerOrganizerPlus = () => {
  const inputList: string[] = parseInputFileToStringArray('./inputs/day5.txt')

  const containerStrings = extractContainerTable(inputList)
  const containerArray = createContainerArrayFromContainerStringTable(containerStrings)
  const movementNumbers = extractContainerMovementNumbers(inputList)

  for(const movementArray of movementNumbers) {
    const [ movementCount, moveFrom, moveTo ] = movementArray

    const stack: string[] = []
    for(let move = 0; move < movementCount; ++move) {
      const contents = containerArray[moveFrom - 1].shift()
      if(contents !== undefined) {
        stack.unshift(contents)
      }

    }

    for(const contents of stack) {
        containerArray[moveTo - 1].unshift(contents)
      }
  }

  let answer = ""
  for(const array of containerArray) {
    answer += (array[0])
  }
  return answer
  
}

console.log(containerOrganizerPlus())
