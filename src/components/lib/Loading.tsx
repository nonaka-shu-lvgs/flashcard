import React from "react";
import {CircularProgress} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

export const Loading: React.VFC = () => {
  return <CircularProgress sx={style}/>
}