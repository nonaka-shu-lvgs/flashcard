import {useState} from "react";

export const MODE = {
  Dictionary: "Dictionary",
  Question: "Question",
  Stats: "Stats"
} as const

type AppMode = keyof typeof MODE

export function useMode() {
  const [mode, setMode] = useState<AppMode>(MODE.Dictionary)

  const [toDictionary, toQuestion, toStats] = [MODE.Dictionary, MODE.Question, MODE.Stats].map(m => () => setMode(m))

  return {
    mode,
    toDictionary,
    toQuestion,
    toStats
  }
}