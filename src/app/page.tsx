import Game from "@/app/components/game";

export default function Home() {
    return (
        <main>
            <div className="flex h-screen justify-center items-center">
                <div className="flex flex-col">
                    <Game/>
                </div>
            </div>
        </main>
    )
}
