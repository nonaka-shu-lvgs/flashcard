import {useDictionary} from "./useDictionary";
import {useState} from "react";
import {Word} from "../states/dictionary";

export function useQuestion() {
  const {words} = useDictionary(1)
  const [questionWords, setQuestionWords] = useState(words)
  const [answeredWords, setAnsweredWords] = useState<Map<Word, string>>(new Map())
  const [word, ...rests] = questionWords


  const collectAnswer = (str: string) => {
    setAnsweredWords(new Map(answeredWords).set(word, str))

    return str === word.word
  }

  const proceed = () => {
    setQuestionWords(rests)
  }

  return {
    word,
    collectAnswer,
    proceed,
    hasNext: rests.length !== 0
  }
}