'use client'

import {useEffect, useState} from "react";
import AnswerRow from "@/app/components/game/AnswerRow";
import OptionGrid from "@/app/components/game/OptionGrid";
import ActionButton from "@/app/components/game/ActionButton";
import SuccessModal from "@/app/components/game/SuccessModal";
import {WORD_SET} from "@/app/utils/wordset";
import {getDayIndexForToday} from "@/app/utils/date";
import {addStatsForCompletedGame, loadStats} from "@/app/utils/stats";
import {loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from "@/app/utils/localStorage";

export default function Game() {
    const [selectedLetterIds, setSelectedLetterIds] = useState<number[]>([])
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
    const [stats, setStats] = useState(() => loadStats())
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const wordSetToday = WORD_SET[getDayIndexForToday()]
    const dayIndexForToday: number = getDayIndexForToday()
    const gameState = loadGameStateFromLocalStorage(dayIndexForToday)

    useEffect(() => {
        if (dayIndexForToday === gameState?.day) {
            setSubmitted(true)
            setSelectedLetterIds(gameState.letterIds)
        }
    }, [])

    useEffect(() => {
        if (submitted) {
            saveGameStateToLocalStorage({
                day: dayIndexForToday,
                answer: getSelectedLetters(),
                letterIds: selectedLetterIds
            })
        }
    }, [submitted])

    const selectionHandler = (letter: string, id: number) => {
        if (submitted) {
            return
        }

        if (selectedLetterIds.length === 16) {
            return
        }

        if (selectedLetterIds.includes(id)) {
            return
        }

        setSelectedLetterIds(prevState => prevState.concat(id))
    }

    const getSelectedLetters = () => {
        let selectedLetters: string[] = []
        selectedLetterIds.map(id => selectedLetters.push(wordSetToday[id]))
        return selectedLetters.join('')
    }

    const clearHandler = () => setSelectedLetterIds([])

    const submitHandler = async () => {
        if (getSelectedLetters().length < 3) {
            clearHandler()
            return
        }

        setLoading(true)
        await fetchIsValidWord(getSelectedLetters())
        setLoading(false)
    }

    const fetchIsValidWord = async (word: string) => {
        try {
            const params = new URLSearchParams({word})
            const url = `/api/spellcheck?${params.toString()}`
            const response = await fetch(url)
            const data = await response.json()
            const isValid = data.isValid

            if (isValid) {
                setSubmitted(true)
                setStats(addStatsForCompletedGame(stats, word, dayIndexForToday))
                setShowSuccessModal(true)
            } else {
                clearHandler()
            }

        } catch (e) {

        }
    }

    return (
        <>
            <div className={`grid grid-cols-1 {${loading && 'pointer-events-none'}`}>
                <AnswerRow selectedLetters={getSelectedLetters()} loading={loading}/>
                <div className="my-6"></div>
                <OptionGrid
                    letters={wordSetToday}
                    selectionHandler={selectionHandler}
                    selectedLetterIds={selectedLetterIds}
                    submitted={submitted}
                />
                <div className="my-6"></div>
                <div className="grid grid-cols-2 gap-4 justify-self-center">
                    {!submitted &&
                        <>
                            <ActionButton type="CLEAR" handler={clearHandler}/>
                            <ActionButton type="SUBMIT" handler={submitHandler}/>
                        </>
                    }
                </div>
            </div>
            <div>
                <SuccessModal
                    showModal={showSuccessModal}
                    setShowModal={setShowSuccessModal}
                    stats={stats}
                />
            </div>
        </>
    );
}
