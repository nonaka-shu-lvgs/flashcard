import {useRecoilState, useRecoilValue} from "recoil";
import {QuestionAnswers, QuestionMode, QuestionWords} from "../states/question";
import {useState} from "react";

export function useQuestion() {
  const words = useRecoilValue(QuestionWords)
  const questionMode = useRecoilValue(QuestionMode)
  const [restQuestionWords, setRestQuestionWords] = useState(words)
  const [answeredWords, setAnsweredWords] = useRecoilState(QuestionAnswers)
  const [word, ...rests] = restQuestionWords


  const answer = (str: string) => {
    setAnsweredWords(new Map(answeredWords).set(word, str))
    return str === word[questionMode]
  }

  const proceed = () => {
    setRestQuestionWords(rests)
  }

  return {
    word,
    answer,
    proceed,
    hasNext: rests.length !== 0,
  }
}