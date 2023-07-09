import React, {useEffect, useState} from "react";

interface LetterProps {
    letter: string
    id: number
    selectionHandler?: (letter: string, id: number) => void
    selectedLetterIds?: number[]
}

const Letter: React.FC<LetterProps> = (props) => {
    const {
        letter,
        id,
        selectionHandler,
        selectedLetterIds
    } = props

    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        if (selectedLetterIds && selectedLetterIds.length === 0) {
            setSelected(false)
        }
    }, [selectedLetterIds])

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        selectionHandler && selectionHandler(letter, id)
        setSelected(true)
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
