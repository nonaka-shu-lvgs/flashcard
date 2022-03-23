import React, {useRef} from "react";
import {Box, Button, Modal, Stack, TextField} from "@mui/material";
import {useDictionary} from "../../hooks/useDictionary";
import {Word} from "../../states/dictionary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
}

type Props = {
  isOpened: boolean
  closeModal: () => void
}

export const CreationModal: React.VFC<Props> = ({isOpened, closeModal}) => {
  const {appendWord} = useDictionary(1)
  const engRef = useRef<HTMLInputElement>()
  const jaRef = useRef<HTMLInputElement>()

  return (
    <Modal open={isOpened} onClose={closeModal}>
      <Box sx={style}>
        <Stack spacing={2}>
          <TextField label="英単語" inputRef={engRef}/>
          <TextField label="日本語" inputRef={jaRef}/>
          <Button variant="contained" onClick={() => {
            appendWord({
              word: engRef.current!.value,
              ja: jaRef.current!.value
            }).then(() => closeModal())
          }}>追加</Button>
        </Stack>
      </Box>
    </Modal>
  )
}