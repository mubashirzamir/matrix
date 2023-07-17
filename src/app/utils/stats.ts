import {loadStatsFromLocalStorage, saveStatsToLocalStorage} from "@/app/utils/localStorage";

export type GameStats = {
    totalGames: number
    totalWordLengths: number
    average: number
    wordHistory: { day: number, word: string }[]
    wordDistribution: number[]
}

const defaultStats: GameStats = {
    totalGames: 0,
    totalWordLengths: 0,
    average: 0,
    wordHistory: [],
    wordDistribution: Array.from(new Array(16), () => 0)
}

export const addStatsForCompletedGame = (stats: GameStats, word: string, dayIndex: number) => {
    const wordLength = word.length

    stats.totalGames += 1
    stats.totalWordLengths += wordLength
    stats.wordHistory.push({day: dayIndex, word: word})
    stats.average = Number((stats.totalWordLengths / stats.totalGames).toFixed(2))
    stats.wordDistribution[wordLength - 1] += 1

    saveStatsToLocalStorage(stats)
    return stats
}

export const loadStats = () => loadStatsFromLocalStorage() || defaultStats
