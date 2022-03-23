import {atom, selector} from "recoil";
import {deleteDB, openDB} from "idb";

type Pagination = {
  currentPage: number,
  totalPage: number
}

export type Word = {
  word: string,
  ja: string
}

const Pagination = atom<Pagination>({
  key: "DictionaryPagination",
  default: {
    currentPage: 1,
    totalPage: 1
  }
})

export const Words = atom<Word[]>({
  key: "DictionaryWords",
  default: [
    {word: "word", ja: "言葉"},
    {word: "country", ja: "国"},
    {word: "index", ja: "目次"},
    {word: "car", ja: "車"},
    {word: "soccer", ja: "サッカー"},
    {word: "baseball", ja: "野球"},
    {word: "keyboard", ja: "キーボード"},
    {word: "open", ja: "開ける"},
    {word: "close", ja: "閉める"},
    {word: "title", ja: "題名"},
  ]
})

export const Dictionary = selector<Word[]>({
  key: "Dictionary",
  get: async ({get}) => {
    const db = await openDB("flashcard", 1,{
      upgrade(db) {
        db.createObjectStore("words")
      }
    })

    return new Promise(r => {
      setTimeout(() => {
        r(get(Words))
      }, 0)
    })
  }
})