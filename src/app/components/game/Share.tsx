import {UAParser} from 'ua-parser-js'
import {GAME_TITLE} from "@/app/utils/constants";

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
    day: number,
    solution: string
) => {
    const textToShare = `${GAME_TITLE} ${day} \n\n` + generateEmojiGrid(solution)
    const shareData = {text: textToShare}
    let shareSuccess = false

    try {
        if (attemptShare(shareData)) {
            navigator.share(shareData)
            shareSuccess = true
        }
    } catch (error) {
        shareSuccess = false
    }

    try {
        if (!shareSuccess) {
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(textToShare)
                    .catch()
            } else {

            }
        }
    } catch (error) {

    }
}

export const generateEmojiGrid = (solution: string) => {
    let tiles: string[] = []
    for (let letter of solution) {
        tiles.push('🟩')
    }
    return tiles.join('')
}

const attemptShare = (shareData: object) => {
    return (
        // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
        browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
        webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
        navigator.canShare &&
        navigator.canShare(shareData) &&
        navigator.share
    )
}
