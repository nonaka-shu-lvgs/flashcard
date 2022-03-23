import React, {Suspense} from "react";
import {Button, ButtonGroup, CircularProgress, Container} from "@mui/material";
import {useMode} from "./hooks/useMode";
import {DictionaryContainer} from "./modes/Dictionary";
import {QuestionContainer} from "./modes/Question";
import {RecoilRoot} from "recoil";
import {Loading} from "./components/lib/Loading";

export const App: React.VFC = () => {
  const {mode, toDictionary, toQuestion, toStats} = useMode()

  return (
    <RecoilRoot>
      <Container>
        <ButtonGroup variant="contained">
          <Button onClick={toDictionary} variant={mode == "Dictionary" ? "outlined" : "contained"}>単語帳</Button>
          <Button onClick={toQuestion} variant={mode == "Question" ? "outlined" : "contained"}>出題</Button>
          <Button onClick={toStats} variant={mode == "Stats" ? "outlined" : "contained"}>統計</Button>
        </ButtonGroup>
        <Container>
          {mode == "Dictionary" ? <Suspense fallback={<Loading/>}><DictionaryContainer/></Suspense> : (<></>)}
          {mode == "Question" ? <QuestionContainer/> : (<></>)}
        </Container>
      </Container>
    </RecoilRoot>
  )
}

