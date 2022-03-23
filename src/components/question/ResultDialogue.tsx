import React from "react";
import {useRecoilValue} from "recoil";
import {CorrectAnswers, QuestionAnswers, QuestionMode} from "../../states/question";
import {
  Box,
  Container,
  Paper,
  Stack,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {AddCircleOutline, CheckCircleOutline} from "@mui/icons-material";

export const ResultDialogue: React.VFC = () => {
  const questionMode = useRecoilValue(QuestionMode)
  const answers = useRecoilValue(QuestionAnswers)
  const correctAnswers = useRecoilValue(CorrectAnswers)

  return (
    <Box alignItems="center">
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Typography alignItems="center" variant="h4">結果</Typography>
          <Typography alignItems="center" variant="h3">{correctAnswers.size} / {answers.size}</Typography>
        </Stack>
        <Stack margin={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>英単語</TableCell>
                  <TableCell>訳</TableCell>
                  <TableCell>回答</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  [...answers].map(([word, answer]) => {
                    return (
                      <TableRow key={word.en}>
                        <TableCell>{word.en}</TableCell>
                        <TableCell>{word.ja}</TableCell>
                        <TableCell>{answer}</TableCell>
                        <TableCell>{answer === word[questionMode] ?
                          <CheckCircleOutline color="success"/> : <AddCircleOutline color="error" sx={{transform: "rotate(-45deg)"}}/>}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
    </Container>
</Box>
)
}