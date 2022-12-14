/*
The Elves don't want to interrupt the crane operator during this delicate procedure, 
but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input)

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"


const extractContainerTable = (inputList: string[]): string[] => {
  let containerStrings: string[] = []
  let line = inputList[0]
  while(line !== ""){    

    let containerString = inputList.shift()
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

  let containerLength = (containerStrings[0].length + 1)/ 4
  for(let i = 0; i < containerLength; ++i) {
    containerArray.push([])
  }

  containerStrings.pop()

  for(let line of containerStrings) {
    for(let contentsIndex = 1; contentsIndex < line.length - 1; contentsIndex += 4) {
      if(line[contentsIndex] !== " ") {
        containerArray[((contentsIndex - 1) / 4)].push(line[contentsIndex])

      }
    }
  }
  return containerArray
}

const extractContainerMovementNumbers = (orderStrings: string[]): number[][] => {
  let orders: number[][] = []

  for(let order of orderStrings) {
    let numberArray = order.match(/[0-9]+/gm)?.map(Number)
    if(numberArray?.length === 3) {
      orders.push(numberArray)
    }

  }
  return orders
}


const containerOrganizer = () => {
  let inputList: string[] = parseInputFileToStringArray('./inputs/day5.txt')

  let containerStrings = extractContainerTable(inputList)
  let containerArray = createContainerArrayFromContainerStringTable(containerStrings)
  let movementNumbers = extractContainerMovementNumbers(inputList)

  for(let movementArray of movementNumbers) {
    let [ movementCount, moveFrom, moveTo ] = movementArray
    for(let move = 0; move < movementCount; ++move) {
      let contents = containerArray[moveFrom - 1].shift()
      if(contents !== undefined) {
        containerArray[moveTo - 1].unshift(contents)
      }
    }
  }

  let answer = ""
  for(let array of containerArray) {
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
  let inputList: string[] = parseInputFileToStringArray('./inputs/day5.txt')

  let containerStrings = extractContainerTable(inputList)
  let containerArray = createContainerArrayFromContainerStringTable(containerStrings)
  let movementNumbers = extractContainerMovementNumbers(inputList)

  for(let movementArray of movementNumbers) {
    let [ movementCount, moveFrom, moveTo ] = movementArray

    let stack: string[] = []
    for(let move = 0; move < movementCount; ++move) {
      let contents = containerArray[moveFrom - 1].shift()
      if(contents !== undefined) {
        stack.unshift(contents)
      }

    }

    for(let contents of stack) {
        containerArray[moveTo - 1].unshift(contents)
      }
  }

  let answer = ""
  for(let array of containerArray) {
    answer += (array[0])
  }
  return answer
  
}

console.log(containerOrganizerPlus())
