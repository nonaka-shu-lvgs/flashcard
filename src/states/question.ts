import {atom, selector} from "recoil";
import {Word} from "./dictionary";
import {openDB} from "idb";
import _ from "lodash"
import {RenderDispatcher} from "./render-dispatcher";

type Answer = string
export type QuestionMode = "en" | "ja"

export const QuestionMode = atom<QuestionMode>({
  key: "QuestionMode",
  default: "en"
})

export const QuestionWords = selector<Word[]>({
  key: "QuestionWords",
  get: async ({get}) => {
    get(RenderDispatcher)
    const db = await openDB("flashcard")
    const totalWordsCount = await db.count("words")

    const offset = _.random(0, totalWordsCount - 11)

    let cursor = await db.transaction("words").store.openCursor()

    let i = 0
    let words: Word[] = []
    while (cursor) {
      if (words.length >= 10) {
        break
      }

      if (i++ < offset) {
        continue
      }

      words.push(cursor!.value as Word)
      cursor = await cursor.continue()
    }

    return _.shuffle(words)
  }
})


export const QuestionAnswers = atom<Map<Word, Answer>>({
  key: "QuestionAnswers",
  default: new Map
})

export const CorrectAnswers = selector({
  key: "CorrectAnswers",
  get: ({get}) => {
    const mode = get(QuestionMode)
    const answers = get(QuestionAnswers)


    const collectAnswers = [...answers.entries()].filter(([w, a]) => w[mode] === a)

    return new Map(collectAnswers)
  }
})