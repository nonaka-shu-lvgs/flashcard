import React, {useState} from "react";
import {useDictionary} from "../hooks/useDictionary";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText, Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon, TextField
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material"
import {Word} from "../states/dictionary";
import {CreationModal} from "../components/dictionary/CreationModal";
import {useRecoilValue} from "recoil";
import {Dictionary as DictionaryState} from "../states/dictionary"

type Props = {
  words: Word[]
}

const Dictionary: React.VFC<Props> = ({words}) => {
  const [focusedWord, setFocusedWord] = useState<Word>()
  const [isOpened, setOpened] = useState(false)

  return (
    <>
      <List>
        {
          words.map(w => (
            <ListItem key={w.word}>
              <ListItemText primary={w.word} secondary={w.ja}/>
              <IconButton aria-label="edit" size="large" onClick={() => {
                console.log(1)
                setFocusedWord(w)
                setOpened(true)
              }}>
                <Edit fontSize="inherit"/>
              </IconButton>
              <IconButton aria-label="delete" size="large">
                <Delete fontSize="inherit"/>
              </IconButton>
            </ListItem>
          ))
        }
      </List>
      <CreationModal isOpened={isOpened} closeModal={() => setOpened(false)} word={focusedWord}/>
    </>
  )
}

export const DictionaryContainer: React.VFC = () => {
  const [isOpened, setOpened] = useState(false)
  const words = useRecoilValue(DictionaryState)

  return (
    <Container>
      <Dictionary words={words}/>
      <SpeedDial
        ariaLabel="ショートカット"
        sx={{position: "absolute", bottom: 24, right: 24}}
        icon={<SpeedDialIcon/>}
      >
        <SpeedDialAction
          key="add"
          icon={<Edit/>}
          tooltipTitle="追加"
          onClick={() => {
            setOpened(true)
          }}
        />
      </SpeedDial>
      <CreationModal isOpened={isOpened} closeModal={() => setOpened(false)}/>
    </Container>

  )
}