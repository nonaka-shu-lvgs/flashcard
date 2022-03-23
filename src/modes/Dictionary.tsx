import React, {useState} from "react";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material"
import {Word} from "../states/dictionary";
import {CreationModal} from "../components/dictionary/CreationModal";
import {useRecoilValue} from "recoil";
import {Dictionary as DictionaryState} from "../states/dictionary"
import {EditModal} from "../components/dictionary/EditModal";

type Props = {
  words: Word[]
}

const Dictionary: React.VFC<Props> = ({words}) => {
  const [focusedWord, setFocusedWord] = useState<Word>()
  const [isOpened, setOpened] = useState(false)

  const openEditor = (word: Word) => () => {
    setFocusedWord(word)
    setOpened(true)
  }
  const closeEditor = () => {
    setFocusedWord(undefined)
    setOpened(false)
  }

  return (
    <>
      <List>
        {
          words.map(w => (
            <ListItem key={w.word}>
              <ListItemText primary={w.word} secondary={w.ja}/>
              <IconButton aria-label="edit" size="large" onClick={openEditor(w)}>
                <Edit fontSize="inherit"/>
              </IconButton>
              <IconButton aria-label="delete" size="large">
                <Delete fontSize="inherit"/>
              </IconButton>
            </ListItem>
          ))
        }
      </List>
      <EditModal isOpened={isOpened} closeModal={closeEditor} word={focusedWord!}/>
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