/* 
To help prioritize item rearrangement, every item type can be converted to a priority:

    Lowercase item types a through z have priorities 1 through 26.
    Uppercase item types A through Z have priorities 27 through 52.

In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
*/

import { parseInputFileToString } from "../libraries/inputParser"

const calculateTotalPriorityValue = () => {
    let input: string = parseInputFileToString('./inputs/day3.txt')
    let inputList: string[] = input.split("\n")
    const CapitalACharCode = 'A'.charCodeAt(0)
    const LowerCaseACharCode = 'a'.charCodeAt(0)
    let priorityScore = 0

    inputList.forEach(rucksack => {
        let compartmentOne = rucksack.slice(0, rucksack.length / 2)
        let compartmentTwo = rucksack.slice(rucksack.length/2, rucksack.length)
        let compartmentOneSet = new Set([...compartmentOne])
        let compartmentTwoSet = new Set([...compartmentTwo])
        

        for(let item of compartmentTwoSet) {
            if(compartmentOneSet.has(item)) {
                if(item.charCodeAt(0) <= 90) {
                    priorityScore +=item.charCodeAt(0) - CapitalACharCode + 27
                } else {
                    priorityScore += item.charCodeAt(0) - LowerCaseACharCode + 1
                }
            }
        }
    });

    return priorityScore
}

console.log(calculateTotalPriorityValue())


/*
Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type.

Find the item type that corresponds to the badges of each three-Elf group.
What is the sum of the priorities of those item types?

*/


const findPriorityBadgeForEachGroupOfThreeElves = () => {
    let input: string = parseInputFileToString('./inputs/day3.txt')
    let inputList: string[] = input.split("\n")
    const CapitalACharCode = 'A'.charCodeAt(0)
    const LowerCaseACharCode = 'a'.charCodeAt(0)
    let priorityScore = 0

    let elfGroupStrings : string[] = []
    let elfGroupList: string[][] = []
    for(let rucksackIndex = 0; rucksackIndex < inputList.length; ++rucksackIndex) {
        elfGroupStrings.push(inputList[rucksackIndex])
        if((rucksackIndex+1) % 3 === 0){
            elfGroupList.push(elfGroupStrings)
            elfGroupStrings = []
        }
    }

    elfGroupList.forEach(elfGroup => {
        let elfOneSet = new Set(elfGroup[0])
        let elfTwoSet = new Set(elfGroup[1])
        let elfThreeSet = new Set(elfGroup[2])

        let elfGroupMap = new Map()
        elfOneSet.forEach(item => {
            elfGroupMap.set(item, 1)
        })
        elfTwoSet.forEach(item => {
            elfGroupMap.has(item) ? elfGroupMap.set(item, elfGroupMap.get(item) + 1): elfGroupMap.set(item, 1)
        })
        elfThreeSet.forEach(item => {
            elfGroupMap.has(item) ? elfGroupMap.set(item, elfGroupMap.get(item) + 1): elfGroupMap.set(item, 1)
        })

        for(let [key, value] of elfGroupMap.entries()) {
            if(value === 3) {
                if(key.charCodeAt(0) <= 90) {
                    priorityScore +=key.charCodeAt(0) - CapitalACharCode + 27
                } else {
                    priorityScore += key.charCodeAt(0) - LowerCaseACharCode + 1
                }
                break
            }

        }
    })
    return priorityScore
}
console.log(findPriorityBadgeForEachGroupOfThreeElves())
