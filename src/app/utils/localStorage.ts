'use client'

import {GAME_STATE_KEY, GAME_STATISTICS_KEY} from "@/app/utils/constants";
import {GameStats} from "@/app/utils/stats";

export type StoredGameState = {
    day: number
    answer: string
}

export const loadStatsFromLocalStorage = () => {
    const stats = localStorage.getItem(GAME_STATISTICS_KEY)
    return stats ? (JSON.parse(stats) as GameStats) : null
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
    localStorage.setItem(GAME_STATISTICS_KEY, JSON.stringify(gameStats))
}

export const loadGameStateFromLocalStorage = (dayIndex: number) => {
    const state = localStorage.getItem(GAME_STATE_KEY)
    return state ? (JSON.parse(state) as StoredGameState) : null
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
}