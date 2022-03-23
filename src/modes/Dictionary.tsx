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
import {EditModal} from "../components/dictionary/EditModal";
import {useDictionary} from "../hooks/useDictionary";

type Props = {
  words: Word[]
  onEdit: (prev: Word, word: Word) => Promise<void>
  onDelete: (word: Word) => Promise<void>
}

const Dictionary: React.VFC<Props> = ({words, onEdit, onDelete}) => {
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
            <ListItem key={w.en}>
              <ListItemText primary={w.en} secondary={w.ja}/>
              <IconButton aria-label="edit" size="large" onClick={openEditor(w)}>
                <Edit fontSize="inherit"/>
              </IconButton>
              <IconButton aria-label="delete" size="large" onClick={() => onDelete(w)}>
                <Delete fontSize="inherit"/>
              </IconButton>
            </ListItem>
          ))
        }
      </List>
      <EditModal isOpened={isOpened} onSubmit={onEdit} closeModal={closeEditor} word={focusedWord!}/>
    </>
  )
}

export const DictionaryContainer: React.VFC = () => {
  const [isOpened, setOpened] = useState(false)
  const { words, addWord, editWord, deleteWord } = useDictionary()

  return (
    <Container>
      <Dictionary words={words} onEdit={editWord} onDelete={deleteWord}/>
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
      <CreationModal isOpened={isOpened} onSubmit={addWord} closeModal={() => setOpened(false)}/>
    </Container>

  )
}