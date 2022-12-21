/*
Start by figuring out the signal being sent by the CPU. The CPU has a single register, X, which starts with the value 1. It supports only two instructions:

    addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
    noop takes one cycle to complete. It has no other effect.

The CPU uses these instructions in a program (your puzzle input) to, somehow, tell the screen what to draw.

Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
*/

import { parseInputFileToStringArray } from '../libraries/inputParser'

type instruction = [string, number] | [string]

const convertInputArrayToInstructions = (inputList: string[]): instruction[] => {
  let instructions: instruction[] = []
  for(let line of inputList) {
    if(line.length > 0){
      if(line === 'noop') {
        instructions.push([line])
      } else {
        let instruction = line.split(" ")
        instructions.push([instruction[0], parseInt(instruction[1])])
      }
    }
  }
  return instructions
}

const calculateSignalStrengths = () => {
  let inputList = parseInputFileToStringArray('./inputs/day10.txt')
  let instructions = convertInputArrayToInstructions(inputList)
  let cycles = Array.from(Array(instructions.length * 2), () => 0)
  cycles[0] = 1
  let cycleIndex = 0
  for(let instruction of instructions){
    if(instruction.length > 1 ) {
      cycles[cycleIndex + 2] += instruction[1]!
      cycleIndex++
    }
    cycleIndex++
  }
  let vValues: number[] = []
  let vTotal =0
  for(let i = 0; i < cycleIndex; ++i) {
    vTotal+= cycles[i]
    vValues.push(vTotal * (i+1))
  }
  let sum = 0
  for(let i = 19; i < vValues.length; i+= 40) {
    sum += vValues[i]
  }
  return sum
}

// console.log(calculateSignalStrengths())



/*
So, by carefully timing the CPU instructions and the CRT drawing operations,
you should be able to determine whether the sprite is visible the instant each pixel is drawn. 
If the sprite is positioned such that one of its three pixels is the pixel currently being drawn, the screen produces a lit pixel (#);
otherwise, the screen leaves the pixel dark (.). 

Render the image given by your program. What eight capital letters appear on your CRT?
*/
const isSpriteVisible = (cycle: number, spriteLocation: number) => {
  return cycle === spriteLocation -1 || cycle === spriteLocation  || cycle === spriteLocation + 1
}
const addPixelToScreen = (spriteLocation:number, cycle:number, screen: string[][]) => {
  let row = Math.floor(cycle/40)
  if(isSpriteVisible(cycle % 40, spriteLocation)){
    screen[row].push('#')
  } else {
    screen[row].push('.')
  }
}

const renderImageFromCycleInput = () => {
  let inputList = parseInputFileToStringArray('./inputs/day10.txt')
  let instructions = convertInputArrayToInstructions(inputList)
  let cycles = Array.from(Array(instructions.length * 2), () => 0)
  let screen = Array.from(Array(6), () => [] as string[])
  cycles[0] = 1
  let cycleIndex = 0

  for(let instruction of instructions){
    // get pixel location
    let pixelLocation = cycles[0]
    if(cycleIndex > 0){
      pixelLocation = cycles[cycleIndex - 1]
    }

    if(instruction.length > 1 ) {
      cycles[cycleIndex + 1] += instruction[1]!
      addPixelToScreen(pixelLocation, cycleIndex, screen)
      if(cycleIndex > 0) {
        cycles[cycleIndex] += pixelLocation
      }
      pixelLocation = cycles[cycleIndex]
      ++cycleIndex
    }

    addPixelToScreen(pixelLocation, cycleIndex, screen)
    if(cycleIndex > 0) {
      cycles[cycleIndex] += pixelLocation
    }
    ++cycleIndex

  }
  for(let line of screen){
    console.log(line.join(''))
  }


}

console.log(renderImageFromCycleInput())
