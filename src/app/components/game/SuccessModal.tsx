import React from "react";
import {shareStatus} from "@/app/components/game/Share";
import {GameStats} from "@/app/utils/stats";

interface SuccessModalProps {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    stats: GameStats
}

const SuccessModal: React.FC<SuccessModalProps> = (props) => {
    const {showModal, setShowModal, stats} = props

    return (
        <>
            {showModal &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                className="relative transform overflow-hidden bg-gray-800 text-left shadow-xl transition-all w-full max-w-lg">

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="mt-4 mb-2 mx-6 text-xl text-white"
                                        onClick={() => setShowModal(false)}
                                    >
                                        X
                                    </button>
                                </div>

                                <div className="w-full p-6">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-bold leading-6 text-white"
                                            id="modal-title">STATISTICS</h3>
                                        <div className="grid grid-cols-2 gap-4 p-4">
                                            <div className="text-center">
                                                <div>
                                                    <p>{stats.totalGames}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs">PLAYED</p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div>
                                                    <p>{stats.average}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs">AVERAGE</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-white flex flex-col items-center">
                                            <div className="mb-2 font-medium">
                                                DISTRIBUTION
                                            </div>
                                            <table>
                                                <tbody>
                                                {
                                                    stats.wordDistribution.map((item, index) => {
                                                        if (item !== 0) {
                                                            return <tr key={index}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    letters -&gt; {item}
                                                                </td>
                                                            </tr>
                                                        }
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-6 text-center">
                                    <button type="button"
                                            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border"
                                            onClick={() =>
                                                shareStatus(
                                                    stats.wordHistory[stats.wordHistory.length - 1].day,
                                                    stats.wordHistory[stats.wordHistory.length - 1].word,
                                                )
                                            }>
                                        SHARE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default SuccessModal