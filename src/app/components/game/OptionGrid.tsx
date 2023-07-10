import LetterContainers from "@/app/components/game/LetterContainers";
import React from "react";

interface OptionGridProps {
    letters: string[]
    selectionHandler: (letter: string, id: number) => void
    selectedLetterIds: number[]
    submitted: boolean
}

const OptionGrid: React.FC<OptionGridProps> = (props) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="grid grid-cols-4 border-white border-2">
                    <LetterContainers {...props}/>
                </div>
            </div>
        </>
    );
}

export default OptionGrid