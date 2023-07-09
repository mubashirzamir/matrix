import React, {useState} from "react";

interface ActionButtonProps {
    type: string
    handler: () => void
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    const {type, handler} = props
    const className = type === 'SUBMIT'
        ? 'bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border'
        : 'bg-gray-800 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 border'

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handler()
    }

    return (
        <>
            <div className="text-center">
                <button className={className} onClick={onClick}>
                    <strong>{type.toUpperCase()}</strong>
                </button>
            </div>
        </>
    );
}

export default ActionButton
