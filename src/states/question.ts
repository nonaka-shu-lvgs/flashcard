import {atom, selector} from "recoil";
import {Word} from "./dictionary";

type Answer = string
type QuestionMode = "en" | "ja"

export const QuestionMode = atom<QuestionMode>({
  key: "QuestionMode",
  default: "ja"
})

export const QuestionWords = atom<Word[]>({
  key: "QuestionWords",
  default: []
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