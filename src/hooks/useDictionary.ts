import {Dictionary, Word} from "../states/dictionary";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {openDB} from "idb";
import {RenderDispatcher} from "../states/render-dispatcher";

export function useDictionary() {
  const dispatch = useSetRecoilState(RenderDispatcher)
  const words = useRecoilValue(Dictionary)

  const addWord = (word: Word) => {
    return openDB("flashcard", 1).then(db => {
      return db.put("words", word, word.en)
    }).then(() => {
      dispatch((c) => c + 1)
    })
  }

  const editWord = (prev: Word, newWord: Word) => {
    return openDB("flashcard", 1)
      .then(db => {
        return db.delete("words", prev.en)
          .then(
            () => {
              return db.put("words", newWord, newWord.en)
            })
      })
      .then(() => {
        dispatch((c) => c + 1)
      })
  }

  const deleteWord = (word: Word) => {
    return openDB("flashcard", 1)
      .then(db => {
        return db.delete("words", word.en)
      })
      .then(() => {
        dispatch((c) => c + 1)
      })
  }

  return {
    words,
    addWord,
    editWord,
    deleteWord
  }
}