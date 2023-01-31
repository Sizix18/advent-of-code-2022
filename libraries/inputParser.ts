import fs from 'fs'

export const parseInputFileToString = (fileLocation: string): string => {
  return fs.readFileSync(fileLocation, { encoding: "utf-8"})

}

export const parseInputFileToStringArray = (fileLocation: string): string[] => {
  const input = fs.readFileSync(fileLocation, { encoding: "utf-8"})
  return input.split("\n")
}

export const parseInputFileToNumberArray = (fileLocation: string): number[][] => {
  const numberArray: number[][] = []
  const input = fs.readFileSync(fileLocation, { encoding: "utf-8"})
  const inputLines = input.split("\n")
  for(const line of inputLines) {
    if(line) {
      numberArray.push(line.split("").map((value) => parseInt(value, 0)))
    }
  }
  return numberArray
}

export const parseInputFileTo2DStringArray = (fileLocation: string): string[][] => {
  const stringArray: string[][] = []
  const input = fs.readFileSync(fileLocation, { encoding: "utf-8"})
  const inputLines = input.split("\n")
  for(const line of inputLines) {
    if(line) {
      stringArray.push(line.split(""))
      }
  }
  return stringArray
}
