import Typo from "typo-js";
import {NextRequest, NextResponse} from "next/server";
import path from 'path';

const directory = path.join(process.cwd(), 'dictionaries');

const dictionary = new Typo('en_US', null, null, {
    dictionaryPath: directory
})

const isValidWord = (word: string): boolean => dictionary.check(word)

export async function GET(req: NextRequest, res: NextResponse) {
    const word = req.nextUrl.searchParams.get('word') as string
    const isValid = isValidWord(word)
    return NextResponse.json({isValid})
}

