import {Word, Words} from "../states/dictionary";
import {useState} from "react";
import {useRecoilState} from "recoil";

export function useDictionary(page: number) {
  // const [_, setWords] = useRecoilState(Words)
  // const [words] = useRecoil

  const appendWord = (word: Word) => {
    return Promise.resolve()
  }

  return {
    // words,
    appendWord
  }
}