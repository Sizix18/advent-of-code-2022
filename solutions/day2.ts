/* 

The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. 
The second column is what you are going to play: X for Rock, Y for Paper, Z for Scissors.
The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. 
The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

What would your total score be if everything goes exactly according to your strategy guide?
*/
import { parseInputFileToString } from '../libraries/inputParser'


const rockPaperScissorsTournamentScore = () => {
  const input = parseInputFileToString('./inputs/day2.txt')
  let opponentMove = ""
  let yourMove = ""
  let totalScore = 0
  const values = new Map([['X', 1], ['Y', 2], ['Z', 3]])

  for(const char of input ) {
    if(char !== ' ' && char !== "\n" && char !== undefined) {
      if(opponentMove === "") opponentMove = char
      else {
        yourMove = char
        let roundScore = 0
        roundScore += values.get(yourMove) || 0
        const roundResult = yourMove.charCodeAt(0) - opponentMove.charCodeAt(0)
        if(roundResult % 3 === 0) {
          roundScore +=6
        } else if( roundResult === 23) {
          roundScore += 3
        }
        totalScore += roundScore

        roundScore = 0
        yourMove = ""
        opponentMove = ""
      }
    }
  }
  return totalScore

}

console.log(rockPaperScissorsTournamentScore())

/*
--- Part Two ---

The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

    In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
    In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
    In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.

Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

*/


const rockPaperScissorsTournamentScoreWithTopSecretDecipher = () => {
  const input = parseInputFileToString('./inputs/day2.txt')
  let opponentMove = ""
  let intendedRoundResult = ""
  let totalScore = 0
  const pointMap = new Map([['X', 0], ['Y', 3], ['Z', 6]])
  const winMap = new Map([['A', 2], ['B', 3], ['C', 1]])
  const tieMap = new Map([['A', 1], ['B', 2], ['C', 3]])
  const loseMap = new Map([['A', 3], ['B', 1], ['C', 2]])

  for(const char of input ) {
    if(char !== ' ' && char !== "\n" && char !== undefined) {
      if(opponentMove === "") opponentMove = char
      else {
        intendedRoundResult = char
        let roundScore = 0
        roundScore += pointMap.get(intendedRoundResult) || 0
        if(intendedRoundResult === 'X') {
          roundScore += loseMap.get(opponentMove) || 0
        } else if(intendedRoundResult === 'Y') {
          roundScore += tieMap.get(opponentMove) || 0
        } else {
          roundScore += winMap.get(opponentMove) || 0

        }

        totalScore += roundScore

        roundScore = 0
        intendedRoundResult = ""
        opponentMove = ""
      }
    }
  }
  return totalScore

}

console.log(rockPaperScissorsTournamentScoreWithTopSecretDecipher())
