// go line by line and add each signal and beacon to a map
// for each signal and beacon, figure out distance, and fill in map where there is no way for there to be a beacon
// check the line for number of impossible locations

import { parseInputFileToStringArray } from "../libraries/inputParser"

// possible issues
//  storing all this info in a map may be bad
//  trying to check for an entire row in a map may not be easy


const checkRowForInvalidBeaconLocationCount = (dataLocation: string, scannedElevation: number): number => {
  const inputList = parseInputFileToStringArray(dataLocation).filter(Boolean)
  const occupiedXLocations = new Set<number>()
  let nonBeaconCount = 0
  for(const line of inputList) {
    const [sx, sy, bx, by] = line.match(/-?\d+/g)?.map(num => parseInt(num, 0)) || []
    const range = Math.abs(sx - bx) + Math.abs(sy - by)

    if(sy === scannedElevation){
      occupiedXLocations.add(sx)
    }
    if(by === scannedElevation) {
      occupiedXLocations.add(bx)
    }

    // is signal distance contain relevant elevation
    if(Math.abs(scannedElevation - sy) <= range){
      for(let i = sx - range; i <= sx + range; ++i) {
        if(!occupiedXLocations.has(i) && Math.abs(sx - i) + Math.abs(sy - scannedElevation) <= range) {
          occupiedXLocations.add(i)
          nonBeaconCount++
        }
      }
    }
  }
  return nonBeaconCount
}


console.log(checkRowForInvalidBeaconLocationCount('./inputs/day15.txt', 2000000))


/*
Your handheld device indicates that the distress signal is coming from a beacon nearby. The distress beacon is not detected by any sensor, 
but the distress beacon must have x and y coordinates each no lower than 0 and no larger than 4000000.
To isolate the distress beacon's signal, you need to determine its tuning frequency, 
which can be found by multiplying its x coordinate by 4000000 and then adding its y coordinate.

Find the only possible position for the distress beacon. What is its tuning frequency?
*/


type SignalData = {
  sx:number,
  sy:number,
  bx:number, 
  by:number,
  range: number
}

const createDataSetWithRangeFromInput = (inputList: string[]): SignalData[] => {
  const result = []
  for(const line of inputList) {
    const [sx, sy, bx, by] = line.match(/-?\d+/g)?.map(num => parseInt(num, 0)) || []
    const range = Math.abs(sx - bx) + Math.abs(sy - by)
    result.push({sx, sy,bx, by, range})
  }
  return result
}

const isLocationOutOfRange = (x: number, y: number, dataSet: SignalData[]): boolean => {
  return dataSet.every(({sx, sy, range}) =>{
    return Math.abs(sx - x) + Math.abs(sy - y) > range
  })
}

const findDistressBeaconAndGenerateTuningFrequency =  (dataLocation: string, max: number): number => {
  const inputList = parseInputFileToStringArray(dataLocation).filter(Boolean)

  const dataSet = createDataSetWithRangeFromInput(inputList)
  for(const {sx, sy, range} of dataSet) {
    for(let x = sx - range - 1; x <= sx + range + 1; ++x) {
      const rangeDiff = Math.abs(Math.abs(x - sx) - range - 1)
      const lowerY = sy + rangeDiff
      const upperY = sy - rangeDiff
      if(x >= 0 && lowerY >= 0 && x <= max && lowerY <= max && isLocationOutOfRange(x,lowerY, dataSet)) {
        return x * 4000000 + lowerY
      } else if(x >= 0 && upperY >= 0 && x <= max && upperY <= max && isLocationOutOfRange(x,upperY, dataSet)) {
        return x * 4000000 + upperY
      }
    }
  }
  return 0
}

console.log(findDistressBeaconAndGenerateTuningFrequency('./inputs/day15.txt', 4000000))
