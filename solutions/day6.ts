/*
The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most 
recently received characters were all different. 
Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

How many characters need to be processed before the first start-of-packet marker is detected?
*/

import { parseInputFileToString } from "../libraries/inputParser"


const findUniqueStringSequence = (uniqueSequenceLength: number) => {
  const input = parseInputFileToString("./inputs/day6.txt")
  const set: Set<string> = new Set()
  const window: string[] = []
  let index = 0
  while(set.size !== uniqueSequenceLength) {
    if(!set.has(input[index])) {
      set.add(input[index])
      window.push(input[index])
      ++index
    } else {
      let windowElement = window.shift()
      while ( windowElement !== input[index] && windowElement) {
        set.delete(windowElement)
        windowElement = window.shift()
      }
      window.push(input[index])
      ++index
    }

  }
  console.log(window, set.entries())
  return index
}

console.log(findUniqueStringSequence(4))


/*
Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.

A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

How many characters need to be processed before the first start-of-message marker is detected?
*/

console.log(findUniqueStringSequence(14))



