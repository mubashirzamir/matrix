import React from "react"
import Letter from "@/app/components/game/Letter"

interface LetterContainersProps {
    letters: string[]
    selectionHandler: (letter: string, id: number) => void
    selectedLetterIds: number[]
    submittedWord: string
}

const LetterContainers: React.FC<LetterContainersProps> = (props) => {
    const {letters} = props

    return (
        <>
            {
                letters.map((letter, index) =>
                    <div
                        key={index}
                        className={'justify-center items-center border-white w-14 h-14 border-2'}
                    >
                        <Letter
                            letter={letter}
                            id={index}
                            {...props}
                        />
                    </div>
                )
            }
        </>
    )
}

export default LetterContainers
