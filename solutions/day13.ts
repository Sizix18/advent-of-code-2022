/*
Your list consists of pairs of packets; pairs are separated by a blank line. 
You need to identify how many pairs of packets are in the right order.

Determine which pairs of packets are already in the right order. 
What is the sum of the indices of those pairs?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"


const compareLists = (a:any, b:any): boolean|undefined => {
  if(typeof a === 'number' && typeof b === 'number') {
    return a > b ? false : a < b ? true : undefined
  } else if(Array.isArray(a) !== Array.isArray(b)) {
    return compareLists(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b])
  }

  for(let i = 0; i < Math.max(a.length, b.length); ++i) {
    if(a[i] === undefined) return true
    if(b[i] === undefined) return false
    let result = compareLists(a[i], b[i])
    if(result !== undefined) return result
  }
  return undefined
}

const checkSignalIntegrity = () => {
  let inputList = parseInputFileToStringArray('./inputs/day13.txt')
  let messagePairs: [(number|number[])[], (number|number[])[]][] = []
  let signalIndicesSum = 0
  for(let i = 0; i < inputList.length; i+= 3){
    messagePairs.push([JSON.parse(inputList[i]), JSON.parse(inputList[i+1])])
  }

  for (let [index, [leftSignal, rightSignal]] of messagePairs.entries()) {
    if(compareLists(leftSignal, rightSignal)) {
      signalIndicesSum += index + 1
    }
  }
  return signalIndicesSum
}

console.log(checkSignalIntegrity())


/*
The distress signal protocol also requires that you include two additional divider packets
[[2]]
[[6]]

Using the same rules as before, organize all packets (the ones in your list of received packets as well as the two divider packets) into the correct order.

Organize all of the packets into the correct order. What is the decoder key for the distress signal?
*/

const findDecoderKey = () => {
  let inputList: any[] = parseInputFileToStringArray('./inputs/day13.txt')
  inputList = inputList.map(string => {
    let cleanText = string.trim()
    if(cleanText) {
      return JSON.parse(cleanText)
    }
  })
  inputList.push([[2]])
  inputList.push([[6]])
  inputList = inputList.filter(value => value !== undefined)
  inputList.sort((a,b) => {
    let result = compareLists(a,b)
    return result === undefined ? 0 : result ? -1 : 1
  })
  let lowerIndex = inputList.findIndex(value => JSON.stringify(value) === JSON.stringify([[2]])) + 1
  let upperIndex = inputList.findIndex(value => JSON.stringify(value) === JSON.stringify([[6]])) + 1

  return lowerIndex * upperIndex

}

console.log(findDecoderKey())
