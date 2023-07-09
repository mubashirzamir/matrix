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
    const [submittedWord, setSubmittedWord] = useState<string>('')
    const wordSetToday = WORD_SET[getDayIndexForToday()]
    const dayIndexForToday: number = getDayIndexForToday()
    const loaded = loadGameStateFromLocalStorage(dayIndexForToday)

    useEffect(() => {
        if (dayIndexForToday === loaded?.day) {
            setSubmittedWord(loaded.answer)
        }
    }, [])

    useEffect(() => {
        if (submittedWord.length > 0) {
            saveGameStateToLocalStorage({day: dayIndexForToday, answer: submittedWord})
        }
    }, [submittedWord])

    const selectionHandler = (letter: string, id: number) => {
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
            return
        }

        await fetchIsValidWord(getSelectedLetters())
    }

    const fetchIsValidWord = async (word: string) => {
        try {
            const params = new URLSearchParams({word})
            const url = `/api/spellcheck?${params.toString()}`
            const response = await fetch(url)
            const data = await response.json()
            const isValid = data.isValid

            if (isValid) {
                setSubmittedWord(word)
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
            <div className="grid grid-cols-1">
                <AnswerRow selectedLetters={submittedWord ? submittedWord : getSelectedLetters()}/>
                <div className="my-6"></div>
                <OptionGrid
                    letters={wordSetToday}
                    selectionHandler={selectionHandler}
                    selectedLetterIds={selectedLetterIds}
                />
                <div className="my-6"></div>
                <div className="grid grid-cols-2 gap-4 justify-self-center">
                    {submittedWord.length === 0 &&
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
