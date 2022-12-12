/*
Some of the pairs have noticed that one of their assignments fully contains the other. For example, 2-8 fully contains 3-7, 
and 6-6 is fully contained by 4-6. In pairs where one assignment fully contains the other, 
one Elf in the pair would be exclusively cleaning sections their partner will already be cleaning, 
so these seem like the most in need of reconsideration. In this example, there are 2 such pairs.

In how many assignment pairs does one range fully contain the other?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"


const findCompletelyOverlappingPairs = (): number => {
  let inputList: string[] = parseInputFileToStringArray('./inputs/day4.txt')
  let overlapCount = 0
  for(let elfPair of inputList){
    if(elfPair !== ""){
    let elfRanges = elfPair.split(",")
    let elfOneRanges = elfRanges[0].split("-")
    let elfTwoRanges = elfRanges[1].split("-")
    let elfOneLower = parseInt(elfOneRanges[0])
    let elfOneHigher = parseInt(elfOneRanges[1])
    let elfTwoLower =  parseInt(elfTwoRanges[0])
    let elfTwoHigher = parseInt(elfTwoRanges[1])
    if((elfOneLower >= elfTwoLower && elfOneLower <= elfTwoHigher && elfOneHigher >= elfTwoLower && elfOneHigher <= elfTwoHigher) || 
      (elfTwoLower >= elfOneLower && elfTwoLower <= elfOneHigher && elfTwoHigher >= elfOneLower && elfTwoHigher <= elfOneHigher)) {
        overlapCount++
      }

    }

  }
  return overlapCount
}


console.log(findCompletelyOverlappingPairs())


/*
It seems like there is still quite a bit of duplicate work planned.
Instead, the Elves would like to know the number of pairs that overlap at all.

In how many assignment pairs do the ranges overlap?
*/

const findOverlappingPairs = (): number => {
  let inputList: string[] = parseInputFileToStringArray('./inputs/day4.txt')
  let overlapCount = 0
  for(let elfPair of inputList){
    if(elfPair !== ""){
    let elfRanges = elfPair.split(",")
    let elfOneRanges = elfRanges[0].split("-")
    let elfTwoRanges = elfRanges[1].split("-")
    let elfOneLower = parseInt(elfOneRanges[0])
    let elfOneHigher = parseInt(elfOneRanges[1])
    let elfTwoLower =  parseInt(elfTwoRanges[0])
    let elfTwoHigher = parseInt(elfTwoRanges[1])
    if((elfOneLower >= elfTwoLower && elfOneLower <= elfTwoHigher) || 
      (elfOneHigher >= elfTwoLower && elfOneHigher <= elfTwoHigher) || 
      (elfTwoLower >= elfOneLower && elfTwoLower <= elfOneHigher) || 
      (elfTwoHigher >= elfOneLower && elfTwoHigher <= elfOneHigher) ){
        overlapCount++
      }

    }

  }
  return overlapCount
}

console.log(findOverlappingPairs())
