import {Dictionary, Word} from "../states/dictionary";
import {useRecoilValue} from "recoil";

export function useDictionary(page: number) {
  const words = useRecoilValue(Dictionary)

  const appendWord = (word: Word) => {
    return Promise.resolve()
  }

  return {
    words,
    appendWord
  }
}