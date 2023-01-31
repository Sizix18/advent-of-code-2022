/* 
To help prioritize item rearrangement, every item type can be converted to a priority:

    Lowercase item types a through z have priorities 1 through 26.
    Uppercase item types A through Z have priorities 27 through 52.

In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
*/

import { parseInputFileToString } from "../libraries/inputParser"

const calculateTotalPriorityValue = () => {
    const input: string = parseInputFileToString('./inputs/day3.txt')
    const inputList: string[] = input.split("\n")
    const CapitalACharCode = 'A'.charCodeAt(0)
    const LowerCaseACharCode = 'a'.charCodeAt(0)
    let priorityScore = 0

    inputList.forEach(rucksack => {
        const compartmentOne = rucksack.slice(0, rucksack.length / 2)
        const compartmentTwo = rucksack.slice(rucksack.length/2, rucksack.length)
        const compartmentOneSet = new Set([...compartmentOne])
        const compartmentTwoSet = new Set([...compartmentTwo])
        

        for(const item of compartmentTwoSet) {
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
    const input: string = parseInputFileToString('./inputs/day3.txt')
    const inputList: string[] = input.split("\n")
    const CapitalACharCode = 'A'.charCodeAt(0)
    const LowerCaseACharCode = 'a'.charCodeAt(0)
    let priorityScore = 0

    let elfGroupStrings : string[] = []
    const elfGroupList: string[][] = []
    for(let rucksackIndex = 0; rucksackIndex < inputList.length; ++rucksackIndex) {
        elfGroupStrings.push(inputList[rucksackIndex])
        if((rucksackIndex+1) % 3 === 0){
            elfGroupList.push(elfGroupStrings)
            elfGroupStrings = []
        }
    }

    elfGroupList.forEach(elfGroup => {
        const elfOneSet = new Set(elfGroup[0])
        const elfTwoSet = new Set(elfGroup[1])
        const elfThreeSet = new Set(elfGroup[2])

        const elfGroupMap = new Map<string,number>()
        elfOneSet.forEach(item => {
            elfGroupMap.set(item, 1)
        })
        elfTwoSet.forEach(item => {
            if(elfGroupMap.has(item)) {
                const value = elfGroupMap.get(item)
                if(value) {
                    elfGroupMap.set(item, value + 1)
                } else {
                    elfGroupMap.set(item, 1)
                }
            }
        })
        elfThreeSet.forEach(item => {
            if(elfGroupMap.has(item)) {
                const value = elfGroupMap.get(item)
                if(value) {
                    elfGroupMap.set(item, value + 1)
                } else {
                    elfGroupMap.set(item, 1)
                }
            }
        })

        for(const [key, value] of elfGroupMap.entries()) {
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
