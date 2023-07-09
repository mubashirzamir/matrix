import React, {useEffect, useState} from "react";

interface LetterProps {
    letter: string
    id: number
    selectionHandler: (letter: string, id: number) => void
    selectedLetterIds: number[]
    submittedWord: string
}

const Letter: React.FC<LetterProps> = (props) => {
    const {
        letter,
        id,
        selectionHandler,
        selectedLetterIds,
        submittedWord,
    } = props

    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        if (selectedLetterIds.length === 0) {
            setSelected(false)
        }

        if (selectedLetterIds.includes(id)) {
            setSelected(true)
        }

    }, [selectedLetterIds])

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (submittedWord.length === 0) {
            selectionHandler && selectionHandler(letter, id)
            setSelected(true)
        }
    }

    return (
        <>
            {
                !selected &&
                <button className="h-full w-full" onClick={onClick}>
                    <div className="items-center">
                        <p className="font-bold text-xl">{letter.toUpperCase()}</p>
                    </div>
                </button>
            }
        </>
    );
}

export default Letter
