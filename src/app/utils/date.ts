import {addDays, startOfToday} from "date-fns";
import {FIRST_GAME_DATE} from "@/app/utils/constants";

export const getDayIndex = (gameDate: Date) => {
    let start = FIRST_GAME_DATE
    let index = -1
    do {
        index++
        start = addDays(start, 1)
    } while (start <= gameDate)

    return index % 365
}

export const getDayIndexForToday = (): number => getDayIndex(startOfToday())