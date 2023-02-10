/*
Work out the steps to release the most pressure in 30 minutes. What is the most pressure you can release?
*/

import { parseInputFileToStringArray } from "../libraries/inputParser"

type ValveProperties = {
    flowRate: number,
  connectedValveNames: string[]
}

function generateValveMap(inputList: string[]) {
  const valveMap = new Map<string, {flowRate: number, connectedValveNames: string[]}>()
  inputList.forEach((line: string) => {
    const parsedInfo = line.match(/\d+|[A-Z][A-Z]/g)
    if(parsedInfo && parsedInfo.length > 2) {
      const name = parsedInfo?.shift() || ""
      const flowRate = parseInt(parsedInfo?.shift()||"",0)
      const connectedValveNames = parsedInfo
      valveMap.set(name, {flowRate, connectedValveNames})
    }
  })
  return valveMap
}

const bfs = (graph: Map<string, ValveProperties>, start:string, end:string) => {
  const queue = []
  const visited = [start]
  if (start == end) return [start]
  queue.push([start])
  while (queue.length > 0) {
    const path: string[] = queue.shift() || []
    const node = path[path.length - 1]

    const neighbors = graph.get(node)?.connectedValveNames || []
    for(const neighbor of neighbors) {

      if(neighbor === end) return path?.concat([neighbor])
      visited.push(neighbor)
      queue.push(path?.concat([neighbor]))
    }
  }
  return []
}

const calculateDistances = (graph: Map<string, {flowRate: number, connectedValveNames: string[]}>):Record<string,{[key: string]:number}> => {
  const distances:Record<string,{[key: string]:number}> = {}

    Array.from(graph.keys()).forEach( start => {
      Array.from(graph.keys()).forEach(end => {
        if(distances[start] == null) distances[start] = {} 
        distances[start][end] = bfs(graph, start, end).length - 1
      })
    })
  return distances
}

const calculateValveRoutes = (distances: Record<string,{[key: string]:number}>, valve: string, minutes: number, functioningValves: string[], openedValves: Record<string, number> = {}) => {
  const allRoutes = [openedValves]

  functioningValves.forEach((functioningValve, index) => {
    const newMinutes = minutes - distances[valve][functioningValve] - 1
    if(newMinutes < 1) return 

    const openedValvesCopy: Record<string, number> = JSON.parse(JSON.stringify(openedValves))! as Record<string, number>

    openedValvesCopy[functioningValve] = newMinutes

    const functioningValvesCopy = [...functioningValves]
    functioningValvesCopy.splice(index, 1);

    allRoutes.push(...calculateValveRoutes(distances, functioningValve, newMinutes, functioningValvesCopy, openedValvesCopy))
  })

  return allRoutes
}

const releasePressure = (fileLocation: string) => {
  const inputList = parseInputFileToStringArray(fileLocation).filter(Boolean)
  const valveMap = generateValveMap(inputList)
  const distances = calculateDistances(valveMap)

  const functioningValves = Array.from(valveMap.entries()).map(([name, {flowRate}]) => flowRate > 0 ? name : '').filter(Boolean)

  const routes = calculateValveRoutes(distances, 'AA', 30, functioningValves)
  const result = routes.map(route => Object.entries(route).reduce((acc, [key, value]) => acc + (valveMap.get(key)?.flowRate || 0) * value, 0)).sort((a,b) => b-a)[0]
  return result
}

console.log(releasePressure('./inputs/day16.txt'))


/*

You're worried that even with an optimal approach, the pressure released won't be enough. What if you got one of the elephants to help you?

It would take you 4 minutes to teach an elephant how to open the right valves in the right order, 
leaving you with only 26 minutes to actually execute your plan. 
Would having two of you working together be better, even if it means having less time? 
(Assume that you teach the elephant before opening any valves yourself, giving you both the same full 26 minutes.)

With you and an elephant working together for 26 minutes, what is the most pressure you could release?
*/


const releasePressureWithElephantHelp = (fileLocation: string) => {
  const inputList = parseInputFileToStringArray(fileLocation).filter(Boolean)
  const valveMap = generateValveMap(inputList)
  const distances = calculateDistances(valveMap)
  const functioningValves = Array.from(valveMap.entries()).map(([name, {flowRate}]) => flowRate > 0 ? name : '').filter(Boolean)

  const routes = calculateValveRoutes(distances, 'AA', 26, functioningValves)

  const maxScores:Record<string,number> = {};
  routes.forEach(rate => {
      const key = Object.keys(rate).sort().join(',')
      const score = Object.entries(rate).reduce((acc, [key, value]) => acc + (valveMap.get(key)?.flowRate || 0) * value, 0)
      if (maxScores[key] == null) maxScores[key] = -1
      maxScores[key] = Math.max(score, maxScores[key])
  })

  let highest = -1
  Object.keys(maxScores).forEach(player => {
    Object.keys(maxScores).forEach(elephant => {
        const allValves = new Set()
        const playerList = player.split(',')
        playerList.forEach(valve => allValves.add(valve))
        const elephantList = elephant.split(',')
        elephantList.forEach(valve => allValves.add(valve))

        if (allValves.size === (playerList.length + elephantList.length)) highest = Math.max(maxScores[player] + maxScores[elephant], highest);
    })
  })
}

console.log(releasePressureWithElephantHelp('./inputs/day16.txt'))
