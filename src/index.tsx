import React from "react"
import {render} from "react-dom";
import {App} from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const mountPoint = document.getElementById("root")!

  render(<App/>, mountPoint)
})