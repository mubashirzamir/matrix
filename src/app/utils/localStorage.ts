import {GAME_STATE_KEY, GAME_STATISTICS_KEY} from "@/app/utils/constants";
import {GameStats} from "@/app/utils/stats";

export type StoredGameState = {
    day: number
    answer: string
}

export const loadStatsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const stats = window.localStorage.getItem(GAME_STATISTICS_KEY)
        return stats ? (JSON.parse(stats) as GameStats) : null
    }
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(GAME_STATISTICS_KEY, JSON.stringify(gameStats))
    }
}

export const loadGameStateFromLocalStorage = (dayIndex: number) => {
    if (typeof window !== 'undefined') {
        const state = window.localStorage.getItem(GAME_STATE_KEY)
        return state ? (JSON.parse(state) as StoredGameState) : null
    }

    return null
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
    }
}