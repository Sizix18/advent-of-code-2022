/*

Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?
*/
import { parseInputFileToStringArray } from "../libraries/inputParser"

class Directory {
  name: string = ""
  size: number = 0
  parent?: Directory
  children: Directory[] = []

  constructor(name: string = "", parent?: Directory){
    this.name = name
    this.parent = parent
    this.size = 0
  }
}

const generateDirectoryStructure = (inputLines: string[]) => {
  let rootDirectory: Directory = new Directory()
  let currentDirectory: Directory
  let lineIndex = 0
  let line = inputLines[lineIndex]
  while(lineIndex < inputLines.length && line !== "") {
    line = inputLines[lineIndex]
    let stringTokens = line.split(' ')
    
    if(stringTokens[0] === "$") {
      let command = stringTokens[1]
      if (command === "ls") {
        ++lineIndex
        line = inputLines[lineIndex]
        while(line && !line.includes("$")) {
          stringTokens = line.split(" ")
          if(stringTokens[0] === 'dir') {
            let directoryName = stringTokens[1]
            let newDirectory = new Directory(directoryName, currentDirectory!)
            currentDirectory!.children.push(newDirectory)
          } else {
            let fileSize = parseInt(stringTokens[0])
            currentDirectory!.size += fileSize
          }

          ++lineIndex
          line = inputLines[lineIndex]
        }
      } else if (command === "cd") {
        let destination = stringTokens[2]

        if(destination === "..") {
          if(currentDirectory! && currentDirectory.parent) {
            currentDirectory = currentDirectory.parent
          }
        } else {
          if(currentDirectory!) {
            currentDirectory!.children.forEach((value) => {
              if(value.name === destination){
                currentDirectory = value
              }
            })
          } else {
            let newDirectory = new Directory(destination)
            if(currentDirectory!) {
              newDirectory.parent = currentDirectory
            } else {
              rootDirectory = newDirectory
            }            
            currentDirectory = newDirectory
          }
        }
        ++lineIndex
      }
    }
  }
  return rootDirectory
}

const getDirectorySums = (rootDirectory: Directory) => {
  let directorySizeMap: Map<string, number> = new Map()
  getDirectorySum(rootDirectory, '', directorySizeMap)

  return directorySizeMap
}

const getDirectorySum = (directory: Directory, path: string, directorySizeMap: Map<string, number>): number => {
  let nestedSize = 0
  path += directory.name
  if(directory.children.length === 0){
    directorySizeMap.set(path, directory.size)
    return directory.size
  } else {
    for(let child of directory.children) {
      nestedSize += getDirectorySum(child, path,  directorySizeMap)
    }
    nestedSize += directory.size
    directorySizeMap.set(path, nestedSize)
  }
  return nestedSize
}

const findLargeDirectorySizeSumUnderOneHundredThousand = () => {
  let inputList = parseInputFileToStringArray("./inputs/day7.txt")

  let directorySums = 0
  let rootDirectory = generateDirectoryStructure(inputList)
  let directorySumMap = getDirectorySums(rootDirectory)

  directorySumMap.forEach((value) => {
    if(value <= 100000) directorySums += value
  })
  return directorySums
}

console.log(findLargeDirectorySizeSumUnderOneHundredThousand())





/* 
The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000. 
You need to find a directory you can delete that will free up enough space to run the update.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. 
What is the total size of that directory?
*/

const findFolderLargeEnoughToDelete = () => {
  let inputList = parseInputFileToStringArray("./inputs/day7.txt")

  let rootDirectorySize = 0
  let rootDirectory = generateDirectoryStructure(inputList)
  let directorySumMap = getDirectorySums(rootDirectory)

  if(directorySumMap.has(rootDirectory.name)) {
    rootDirectorySize = directorySumMap.get(rootDirectory.name)!
  }
  let remainingSpace = 70000000 - rootDirectorySize
  let minimumRemovalSize = 30000000 - remainingSpace
  let bestDirectorySize = 70000000
  directorySumMap.forEach((value, key) => {
    if(value >= minimumRemovalSize && value <= bestDirectorySize) {
      bestDirectorySize = value

    }
  })
  return bestDirectorySize
}

console.log(findFolderLargeEnoughToDelete())
