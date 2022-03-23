import React from "react";
import {useDictionary} from "../hooks/useDictionary";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import {Delete} from "@mui/icons-material"
import {Word} from "../states/dictionary";

type Props = {
  words: Word[]
}

const Dictionary: React.VFC<Props> = ({words}) => {
  return (
    <List>
      {
        words.map(w => (
          <ListItem key={w.word}>
            <ListItemText primary={w.word} secondary={w.ja}/>
            <IconButton aria-label="delete" size="large">
              <Delete fontSize="inherit"/>
            </IconButton>
          </ListItem>
        ))
      }
    </List>
  )
}

export const DictionaryContainer: React.VFC = () => {
  const {words} = useDictionary(1)

  return <Dictionary words={words}/>
}