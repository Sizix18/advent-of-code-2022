/*
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
*/
import { parseInputFileToString } from '../libraries/inputParser'

const findElfWithMostFood =  () => {
  let input = ""
  input = parseInputFileToString('./inputs/day1.txt')
  let mostCalories = parseInput(input)

  return mostCalories
}

const parseInput = (input: string): number => {
  let calorieTotal = 0
  let tempString = ''
  let calorieList: number[] = []
  for(let charIndex = 0; charIndex < input.length; charIndex++) {
    if(input[charIndex] !== "\n") {
      tempString += input[charIndex]
    } else if(tempString !== '' && input[charIndex] === "\n") {
      calorieTotal += parseInt(tempString)
      tempString = ''
    } else {
      calorieList.push(calorieTotal)
      calorieTotal = 0
      tempString = ''
    }
  }
  calorieList.sort((a,b) => b - a)
  
  return calorieList[0] + calorieList[1] + calorieList[2]
}

console.log(findElfWithMostFood())
