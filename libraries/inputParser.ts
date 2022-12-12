import fs from 'fs'

export const parseInputFileToString = (fileLocation: string): string => {
  return fs.readFileSync(fileLocation, { encoding: "utf-8"})

}

export const parseInputFileToStringArray = (fileLocation: string): string[] => {
  let input = fs.readFileSync(fileLocation, { encoding: "utf-8"})
  return input.split("\n")
}
