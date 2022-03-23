import React, {useState} from "react";
import {Stack} from "@mui/material";
import {QuestionDialogue} from "../components/question/QuestionDialogue";
import {ResultDialogue} from "../components/question/ResultDialogue";

export const QuestionContainer: React.VFC = () => {
  const [isResult, setIsResult] = useState(false)

  return (
    <Stack>
      {
        isResult
          ? <ResultDialogue/>
          : <QuestionDialogue onProceedResult={() => setIsResult(true)}/>
      }
    </Stack>
  )
}