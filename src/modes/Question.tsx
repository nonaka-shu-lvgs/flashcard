import React, {useRef} from "react";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useDictionary} from "../hooks/useDictionary";
import {useQuestion} from "../hooks/useQuestion";

const Question: React.VFC = () => {
  const {word, collectAnswer, proceed, hasNext} = useQuestion()
  const ref = useRef<HTMLInputElement>()

  return (
    <Box alignItems="center">
      <Container maxWidth="sm">
        <Stack spacing={5}>
          <Typography variant="h3" align="center">{word.word}</Typography>
          <TextField helperText="Input your answer" inputRef={ref}/>
          <Button variant="outlined" onClick={() => {
            // console.log(ref.current!.value)
            // console.log(ref.current!.value === word.ja)
            console.log(collectAnswer(ref.current!.value))
            if (hasNext) {
              proceed()
            }
          }}>submit</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export const QuestionContainer: React.VFC = () => {
  return <Question/>

}