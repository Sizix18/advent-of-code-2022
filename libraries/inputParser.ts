import fs from 'fs'

export const parseInputFileToString = (fileLocation: string): string => {
  return fs.readFileSync(fileLocation, { encoding: "utf-8"})

}
