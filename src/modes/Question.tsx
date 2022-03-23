import React, {useRef} from "react";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useDictionary} from "../hooks/useDictionary";

const Question: React.VFC = () => {
  const {words} = useDictionary(1)
  const ref = useRef<HTMLInputElement>()
  const word = words[0]

  return (
    <Box alignItems="center">
      <Container maxWidth="sm">
        <Stack spacing={5}>
          <Typography variant="h3" align="center">{word.word}</Typography>
          <TextField helperText="Input your answer" inputRef={ref}/>
          <Button variant="outlined" onClick={() => {
            console.log(ref.current!.value)
            console.log(ref.current!.value === word.ja)
          }}>submit</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export const QuestionContainer: React.VFC = () => {
  return <Question/>

}