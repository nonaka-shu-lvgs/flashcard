import React from "react";
import {useRecoilValue} from "recoil";
import {CorrectAnswers, QuestionAnswers} from "../../states/question";

export const ResultDialogue: React.VFC = () => {
  const answers = useRecoilValue(QuestionAnswers)
  const correctAnswers = useRecoilValue(CorrectAnswers)

  return (
    <div>{correctAnswers.size} / {answers.size}</div>
  )
}