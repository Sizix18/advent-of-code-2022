/*
The rocks fall in the order shown above: first the - shape, then the + shape, and so on. 
Once the end of the list is reached, the same order repeats: the - shape falls first, sixth, 11th, 16th, etc.

The rocks don't spin, but they do get pushed around by jets of hot gas coming out of the walls themselves. 
A quick scan reveals the effect the jets of hot gas will have on the rocks as they fall (your puzzle input).

After a rock appears, it alternates between being pushed by a jet of hot gas one unit 
(in the direction indicated by the next symbol in the jet pattern) and then falling one unit down. 
If any movement would cause any part of the rock to move into the walls, floor, or a stopped rock, the movement instead does not occur. 
If a downward movement would have caused a falling rock to move into the floor or an already-fallen rock, 
the falling rock stops where it is (having landed on something) and a new rock immediately begins falling.

How many units tall will the tower of rocks be after 2022 rocks have stopped falling?
*/

import { parseInputFileToString } from "../libraries/inputParser"

type RockComponent = {
  x: number,
  y: number
}

type Rock = RockComponent[]

const rocks = [
  [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:3,y:0}], // _
  [{x:1,y:0}, {x:0,y:1}, {x:1,y:1}, {x:2,y:1}, {x:1,y:2}], // +
  [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:2,y:1}, {x:2,y:2}], // ⅃ 
  [{x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:0,y:3}], // |
  [{x:0,y:0}, {x:1,y:0}, {x:0,y:1}, {x:1,y:1}] // ☐
]


const moveRockHorizontally = (rock: Rock, direction: number) => {
  return rock.forEach((component) => {
    component.x += direction
  })
}

const moveRockVertically = (rock: Rock, direction: number) => {
  return rock.forEach((component) => {
    component.y += direction
  })
}
const setInitialRockPosition = (rock: Rock, height: number) => {
  rock.forEach((component) => {
    component.y += height + 4
    component.x += 2
  })
}

const checkRockCollision = (rock:Rock, rockPositions: Set<string>) => {
  // if  -1 < x < 6 then in bounds
  // if y is +1 of any resting rock in set or  -1 < y < inf then in bounds

  for(const component of rock) {
    if(component.x < 0 || component.x > 6) return "wall"
    if(component.y < 1) return "floor"
    if(rockPositions.has(`${component.x},${component.y}`)) return "rock"
  }

  return false
}

const findMaxHeightOfRocks = (fileLocation: string, rocks: Rock[], rockCount: number ): number => {

  const windDirections = parseInputFileToString(fileLocation).replace('\n', '').split('')
  const rockPositions = new Set<string>()
  let highestPosition = 0
  let windDirectionIndex = 0

  let isFalling = false
  for(let index = 0; index < rockCount; ++index) {
    const rockIndex = index % rocks.length
    const currentRock = JSON.parse(JSON.stringify(rocks[rockIndex])) as Rock
    setInitialRockPosition(currentRock, highestPosition)
    let notResting = true
    while(notResting) {
      let windValue = 0
      if(isFalling) {
        moveRockVertically(currentRock, -1)
        isFalling = false

        const collision = checkRockCollision(currentRock, rockPositions)
        if(collision === 'floor'|| collision === 'rock') {
          notResting = false
          currentRock.forEach((component) => {
            component.y += 1
            if(highestPosition < component.y) highestPosition = component.y
            rockPositions.add(`${component.x},${component.y}`)
          })
        }
      } else {
        windDirectionIndex = windDirectionIndex % windDirections.length
        const windDirection = windDirections[windDirectionIndex]
        windValue = windDirection === '<' ? -1 : 1
        moveRockHorizontally(currentRock, windValue)
        isFalling = true
        const collision = checkRockCollision(currentRock, rockPositions)
        if(collision === 'rock' || collision === 'wall') {
          moveRockHorizontally(currentRock, -windValue)
        }
        windDirectionIndex++
      }
    }
  }
  return highestPosition
}

console.log(findMaxHeightOfRocks('./inputs/day17.txt', rocks, 2022))



/*
The elephants are not impressed by your simulation. They demand to know how tall the tower will be after 1000000000000 rocks have stopped! 
Only then will they feel confident enough to proceed through the cave.

How tall will the tower be after 1000000000000 rocks have stopped?
*/



const findMaxHeightOfRocksWithPattern = (fileLocation: string, rocks: Rock[], rockCount: number ): number => {

  const windDirections = parseInputFileToString(fileLocation).replace('\n', '').split('')
  const rockPositions = new Set<string>()
  const loopMap = new Map<string, string>()
  let highestPosition = 0
  let windDirectionIndex = 0
  let loopedHeight = 0
  let loopFound = false
  
  let isFalling = false
  for(let index = 0; index < rockCount; ++index) {
    const rockIndex = index % rocks.length
    const currentRock = JSON.parse(JSON.stringify(rocks[rockIndex])) as Rock
    setInitialRockPosition(currentRock, highestPosition)
    let notResting = true
    while(notResting) {
      let windValue = 0
      if(isFalling) {
        moveRockVertically(currentRock, -1)
        isFalling = false

        const collision = checkRockCollision(currentRock, rockPositions)
        if(collision === 'floor'|| collision === 'rock') {
          notResting = false
          currentRock.forEach((component) => {
            component.y += 1
            if(highestPosition < component.y) highestPosition = component.y
            rockPositions.add(`${component.x},${component.y}`)
          })
        }
      } else {
        windDirectionIndex = windDirectionIndex % windDirections.length
        const windDirection = windDirections[windDirectionIndex]
        windValue = windDirection === '<' ? -1 : 1
        moveRockHorizontally(currentRock, windValue)
        isFalling = true
        const collision = checkRockCollision(currentRock, rockPositions)
        if(collision === 'rock' || collision === 'wall') {
          moveRockHorizontally(currentRock, -windValue)
        }
        ++windDirectionIndex
      }
    }

    // to avoid issues with false patterns due to the flat floor we skip the first 100 placements, will take another pass to optimize later
    if(!loopFound && index > 100) {
      if(loopMap.has(`${rockIndex},${windDirectionIndex}`)) {
        const loopInfo = loopMap.get(`${rockIndex},${windDirectionIndex}`)
        const [loopStart, loopStartHeight] = loopInfo?.split(',').map(num => parseInt(num, 0)) || []
        const indexDiff = index - loopStart
        const heightDiff = highestPosition - loopStartHeight
        const loopIterations = Math.floor((rockCount - index) / indexDiff)
        loopedHeight = heightDiff * loopIterations
        const residual = (rockCount - index) % indexDiff
        index = rockCount - residual
        loopFound = true
      } else {
        loopMap.set(`${rockIndex},${windDirectionIndex}`, `${index}, ${highestPosition}`)
      }
    }

  }
  return highestPosition + loopedHeight
}

console.log(findMaxHeightOfRocksWithPattern('./inputs/day17.txt', rocks, 1000000000000))
