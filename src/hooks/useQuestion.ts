import {useRecoilState, useRecoilValue} from "recoil";
import {QuestionAnswers, QuestionMode, QuestionWords} from "../states/question";
import {Word} from "../states/dictionary";

export function useQuestion(words: Word[]) {
  const questionMode = useRecoilValue(QuestionMode)
  const [questionWords, setQuestionWords] = useRecoilState(QuestionWords)
  const [answeredWords, setAnsweredWords] = useRecoilState(QuestionAnswers)
  const [word, ...rests] = questionWords.length == 0 ? words : questionWords


  const answer = (str: string) => {
    setAnsweredWords(new Map(answeredWords).set(word, str))
    return str === word[questionMode]
  }

  const proceed = () => {
    setQuestionWords(rests)
  }

  return {
    word,
    answer,
    proceed,
    hasNext: rests.length !== 0,
  }
}