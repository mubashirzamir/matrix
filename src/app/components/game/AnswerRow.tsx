import React from "react";

interface AnswerRowProps {
    selectedLetters: string
}

const AnswerRow: React.FC<AnswerRowProps> = (props) => {
    const {selectedLetters} = props

    return (
        <>
            <div className="flex h-6 justify-self-center">
                <p className="tracking-widest font-bold text-xl">
                    {selectedLetters.toUpperCase()}
                </p>
            </div>
        </>
    );
}

export default AnswerRow

