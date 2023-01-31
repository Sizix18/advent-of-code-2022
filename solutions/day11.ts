/*

Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. 
What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"

class Monkey {
  items: number[]
  operationSign: string
  operationValue: string
  testValue: number
  itemDestination: [number, number]
  constructor(items: number[], operationSign: string, operationValue:string, testValue: number, itemDestination: [number, number]){
    this.items = items, 
    this.testValue = testValue
    this.operationSign = operationSign
    this.operationValue = operationValue
    this.itemDestination = itemDestination
  }
}

function parseInputToMonkeyList(inputList: string[]): Monkey[] {
  const monkeys: Monkey[] = []

  for(let lineIndex = 0; lineIndex < inputList.length; ++lineIndex) {
    if(inputList[lineIndex].includes('Monkey')) {
      const items = inputList[lineIndex+1].match(/[0-9]+/g)?.map(num => parseInt(num, 0)) || []
      const operationSign = inputList[lineIndex+2].match(/[+-*]/g)?.pop() || ''
      const operationValue = inputList[lineIndex+2].split(' ').pop() || ''
      const testValue = inputList[lineIndex+3].match(/[0-9]+/g)?.map(parseInt).pop() || 0
      const trueDestination = inputList[lineIndex+4].match(/[0-9]+/g)?.map(parseInt).pop() || 0
      const falseDestination = inputList[lineIndex+5].match(/[0-9]+/g)?.map(parseInt).pop() || 0
      const monkey = new Monkey(items, operationSign, operationValue, testValue, [trueDestination, falseDestination])
      monkeys.push(monkey)
      lineIndex += 6
    }
  }

  return monkeys
}

const findTwoMostActiveMonkeys = () => {
  const inputList = parseInputFileToStringArray('./inputs/day11.txt')
  const monkeys: Monkey[] = parseInputToMonkeyList(inputList)
  const monkeyActivityCount = Array.from(Array(monkeys.length), () => 0)

  for(let i = 0; i < 20; ++i){
    for(const [index, monkey] of monkeys.entries()) {
      while(monkey.items.length > 0) {
        monkeyActivityCount[index]++
        let worryLevel = monkey.items.shift() || 0

        let operationValue = 0
        if(monkey.operationValue === "old") {
          operationValue = worryLevel
        } else {
          operationValue = parseInt(monkey.operationValue)
        }
      
        switch(monkey.operationSign) {
          case '+':
            worryLevel += operationValue
            break;
          case '*':
            worryLevel *= operationValue
            break;
          case '-':
            worryLevel -= operationValue
            break;
        }

        worryLevel = Math.floor(worryLevel / 3)

        worryLevel % monkey.testValue === 0 ? monkeys[monkey.itemDestination[0]].items.push(worryLevel) : monkeys[monkey.itemDestination[1]].items.push(worryLevel)
      }
    }
  }

  monkeyActivityCount.sort((a,b) => b-a)
  const largestCount = monkeyActivityCount.shift() || 0
  const secondLargestCount = monkeyActivityCount.shift() || 0

  return largestCount * secondLargestCount

}

console.log(findTwoMostActiveMonkeys())



const findTwoMostActiveMonkeysWithNoStressMitigation = () => {
  const inputList = parseInputFileToStringArray('./inputs/day11.txt')
  const monkeys: Monkey[] = parseInputToMonkeyList(inputList)
  const monkeyActivityCount: number[] = Array.from(Array(monkeys.length), () => 0)
  const mod = monkeys.reduce((a,b) => a * b.testValue, 1)

  for(let i = 0; i < 10000; ++i){
    for(const [index, monkey] of monkeys.entries()) {
      while(monkey.items.length > 0) {
        monkeyActivityCount[index]++
        let worryLevel = monkey.items.shift() || 0

        let operationValue = 0
        if(monkey.operationValue === "old") {
          operationValue = worryLevel
        } else {
          operationValue = parseInt(monkey.operationValue)
        }
      
        switch(monkey.operationSign) {
          case '+':
            worryLevel += operationValue
            break;
          case '*':
            worryLevel *= operationValue
            break;
          case '-':
            worryLevel -= operationValue
            break;
        }
        worryLevel = worryLevel % mod
        worryLevel % monkey.testValue === 0 ? monkeys[monkey.itemDestination[0]].items.push(worryLevel) : monkeys[monkey.itemDestination[1]].items.push(worryLevel)
      }
    }
  }
  monkeyActivityCount.sort((a,b) => b-a)
  const largestCount = monkeyActivityCount.shift() || 0
  const secondLargestCount = monkeyActivityCount.shift() || 0

  return largestCount * secondLargestCount

}


console.log(findTwoMostActiveMonkeysWithNoStressMitigation())
