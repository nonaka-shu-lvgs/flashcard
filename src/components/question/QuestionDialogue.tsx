import React, {useCallback, useRef, useState} from "react";
import {Alert, AlertTitle, Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useQuestion} from "../../hooks/useQuestion";
import {TimerIndicator} from "../lib/TimerIndicator";
import {useRecoilValue} from "recoil";
import {QuestionMode} from "../../states/question";

type Process = "question" | "correct" | "incorrect"

type Props = {
  onProceedResult: () => void
}

export const QuestionDialogue: React.VFC<Props> = ({onProceedResult}) => {
  const _onProceedResult = useCallback(onProceedResult, [onProceedResult])
  const {word, answer, proceed, hasNext} = useQuestion()
  const mode = useRecoilValue(QuestionMode)
  const [process, setProcess] = useState<Process>("question")

  const ref = useRef<HTMLInputElement>(null)

  const SubmitButton = () => (
    <Button variant="contained" onClick={() => {
      const isCorrect = answer(ref.current?.value?.trim() ?? "")

      setProcess(isCorrect ? "correct" : "incorrect")
    }}>回答</Button>
  )

  const next = () => {
    if (hasNext) {
      setProcess("question")
      ref.current && (ref.current.value = "")
      proceed()
    }
  }

  return (
    <Box alignItems="center">
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Typography variant="h3" align="center">{word[mode === "en" ? "ja" : "en"]}</Typography>
          <TextField helperText="Input your answer" inputRef={ref} disabled={process !== "question"}/>
          {
            process == "question"
              ? <SubmitButton/>
              : process == "correct"
              ? <CorrectDialogue onProceed={next} onProceedResult={_onProceedResult} hasNext={hasNext}/>
              : <InCorrectDialogue onProceed={next} onProceedResult={_onProceedResult} hasNext={hasNext} answer={word[mode]}/>
          }
        </Stack>
      </Container>
    </Box>
  )
}


type DialogueProps = {
  onProceed: () => void,
  onProceedResult: () => void
  hasNext: boolean,
}

const CorrectDialogue: React.VFC<DialogueProps> = ({onProceed, hasNext, onProceedResult}) => {
  return (
    <Stack spacing={2}>
      <Alert severity="success">
        <AlertTitle>正解！</AlertTitle>
      </Alert>
      <TimerIndicator time={3000} onExceeded={onProceed} resolution={100} color="success"/>
      {
        hasNext
          ? <Button variant="outlined" onClick={onProceed}>次へ</Button>
          : <ProceedResultButton onProceedResult={onProceedResult}/>
      }
    </Stack>
  )
}

const InCorrectDialogue: React.VFC<DialogueProps & { answer: string }> = ({
                                                                            onProceed,
                                                                            hasNext,
                                                                            onProceedResult,
                                                                            answer
                                                                          }) => {
  return (
    <Stack spacing={2}>
      <Alert severity="error">
        <AlertTitle>不正解</AlertTitle>
        正解は「{answer}」
      </Alert>
      <TimerIndicator time={5000} onExceeded={onProceed} resolution={100} color="error"/>
      {
        hasNext
          ? <Button variant="outlined" onClick={onProceed}>次へ</Button>
          : <ProceedResultButton onProceedResult={onProceedResult}/>
      }
    </Stack>
  )
}

const ProceedResultButton: React.VFC<{ onProceedResult: () => void }> = ({onProceedResult}) => (<Button
  variant="contained" onClick={onProceedResult}>結果を見る</Button>)


