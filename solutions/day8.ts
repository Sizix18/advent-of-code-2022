/*
First, determine whether there is enough tree cover here to keep a tree house hidden. 
To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

Consider your map; how many trees are visible from outside the grid?
*/


import { parseInputFileToNumberArray } from '../libraries/inputParser'



const getCountOfVisibleTrees = () => {
  let treeGrid = parseInputFileToNumberArray("./inputs/day8.txt")
  let topTallestTree: number[] = new Array(treeGrid.length).fill(0)
  let leftTallestTree: number[] = new Array(treeGrid[0].length).fill(0)
  let bottomTallestTree: number[] = new Array(treeGrid.length).fill(0)
  let rightTallestTree: number[] = new Array(treeGrid[0].length).fill(0)
  let treeVisibility: boolean[][] = new Array(treeGrid.length).fill(false).map(() => new Array(treeGrid[0].length).fill(false))
  let visibleTreeCount = 0

  for(let row = 0; row < treeGrid.length; ++row) {
    for(let column = 0; column < treeGrid[row].length; ++column) {
      let currentTree = treeGrid[row][column]

      if(row >=1 && row < treeGrid[row].length - 1 && column >= 1 && column < treeGrid.length - 1) {

        if(leftTallestTree[row] < currentTree || topTallestTree[column] < currentTree) {
          treeVisibility[row][column] = true
        }
      } else {
        treeVisibility[row][column] = true
      }

      if (leftTallestTree[row] < currentTree) leftTallestTree[row] = currentTree
      if (topTallestTree[column] < currentTree) topTallestTree[column] = currentTree
      
    }
  }

  for(let row = treeGrid.length - 1; row >= 0; --row) {
    for(let column = treeGrid[row].length - 1; column >= 0; --column) {
      let currentTree = treeGrid[row][column]
      if(treeVisibility[row][column] !== true){
        if(rightTallestTree[row] < currentTree || bottomTallestTree[column] < currentTree) {
          treeVisibility[row][column] = true
          visibleTreeCount++
        }

      } else {
        visibleTreeCount++
      }
      if (rightTallestTree[row] < currentTree) rightTallestTree[row] = currentTree
      if (bottomTallestTree[column] < currentTree) bottomTallestTree[column] = currentTree
    }
  }
  return visibleTreeCount
}

console.log(getCountOfVisibleTrees())



/*

A tree's scenic score is found by multiplying together its viewing distance in each of the four directions.
Consider each tree on your map. What is the highest scenic score possible for any tree?
*/


const getMostScenicTreeScore = () => {
  let treeGrid = parseInputFileToNumberArray("./inputs/day8.txt")
  let topTallestTree: number[] = new Array(treeGrid.length).fill(0)
  let leftTallestTree: number[] = new Array(treeGrid[0].length).fill(0)
  let bottomTallestTree: number[] = new Array(treeGrid.length).fill(0)
  let rightTallestTree: number[] = new Array(treeGrid[0].length).fill(0)
  let treeScore: number[][] = new Array(treeGrid.length).fill(0).map(() => new Array(treeGrid[0].length).fill(0))
  let mostScenicScore: number = 0

  for(let row = 0; row < treeGrid.length; ++row) {
    for(let column = 0; column < treeGrid[row].length; ++column) {
      let currentTree = treeGrid[row][column]
      let leftScore = 0
      let topScore = 0

      if(currentTree > leftTallestTree[row]) {
        leftScore += column
      } else {
        let leftIndex = column - 1
        if(leftIndex >= 0 && treeGrid[row][leftIndex] === currentTree) {
          leftScore += 1
        } else {
          while(leftIndex >= 0) {
            leftScore += 1
            if(currentTree <= treeGrid[row][leftIndex]) {
              leftIndex = -1 
            } else {
              --leftIndex
            }
          }
        }
      }

      if(currentTree > topTallestTree[column]) {
        topScore += row
      } else {
        let topIndex = row - 1

        if(topIndex >= 0 && treeGrid[topIndex][column] >= currentTree) {
          topScore += 1
        } else {
          while( topIndex >= 0) {
            topScore += 1
            if(currentTree <= treeGrid[topIndex][column]) {
              topIndex = -1
            } else {
              --topIndex
            }
          }
        }
      }
      
      treeScore[row][column] += leftScore * topScore

      if (leftTallestTree[row] < currentTree) leftTallestTree[row] = currentTree
      if (topTallestTree[column] < currentTree) topTallestTree[column] = currentTree
    }
  }

  for(let row = treeGrid.length - 1; row >= 0; --row) {
    for(let column = treeGrid[row].length - 1; column >= 0; --column) {
      let currentTree = treeGrid[row][column]
      let bottomScore = 0
      let rightScore = 0

      if(row === 0 || column === 0 || row === treeGrid.length - 1 || column === treeGrid[row].length - 1) {
        treeScore[row][column] = 0
      } else if(currentTree > rightTallestTree[row]) {
        rightScore += treeGrid[row].length - 1 - column
      } else {
        let rightIndex = column + 1
        if(rightIndex < treeGrid[row].length && treeGrid[row][rightIndex] === currentTree) {
          rightScore += 1
        } else {
          while(rightIndex < treeGrid[row].length) {
            rightScore += 1
            if(currentTree <= treeGrid[row][rightIndex]) {
              rightIndex = treeGrid[row].length 
            } else {
              ++rightIndex
            }

          }
        }
      }

      if(currentTree > topTallestTree[column]) {
        bottomScore += treeGrid.length - row - 1
      } else {
        let bottomIndex = row + 1
        if(bottomIndex < treeGrid.length && treeGrid[bottomIndex][column] === currentTree) {
          bottomScore += 1
        } else {
          while(bottomIndex < treeGrid.length) {
            bottomScore += 1
            if(currentTree <= treeGrid[bottomIndex][column]) {
              bottomIndex = treeGrid[row].length 
            } else {
              ++bottomIndex
            }
          }
        }
      }

      treeScore[row][column] *= bottomScore * rightScore

      if(mostScenicScore < treeScore[row][column]) mostScenicScore = treeScore[row][column]

      if (rightTallestTree[row] < currentTree) rightTallestTree[row] = currentTree
      if (bottomTallestTree[column] < currentTree) bottomTallestTree[column] = currentTree
    }
  }

  return mostScenicScore
}

console.log(getMostScenicTreeScore())
