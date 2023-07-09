import Typo from "typo-js";
import {NextRequest, NextResponse} from "next/server";

const dictionary = new Typo('en_US', null, null, {
    dictionaryPath: 'src/app/api/spellcheck/dictionaries'
})

const isValidWord = (word: string): boolean => dictionary.check(word)

export async function GET(req: NextRequest, res: NextResponse) {
    const word = req.nextUrl.searchParams.get('word') as string
    const isValid = isValidWord(word)
    return NextResponse.json({isValid})
}

