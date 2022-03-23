import {atom, selector} from "recoil";
import {openDB} from "idb";
import {RenderDispatcher} from "./render-dispatcher";

type Pagination = {
  currentPage: number,
  totalPage: number
}

export type Word = {
  en: string,
  ja: string
}

const Pagination = atom<Pagination>({
  key: "DictionaryPagination",
  default: {
    currentPage: 1,
    totalPage: 1
  }
})

export const Dictionary = selector<Word[]>({
  key: "Dictionary",
  get: async ({get}) => {
    get(RenderDispatcher)
    const db = await openDB("flashcard", 1,{
      upgrade(db) {
        db.createObjectStore("words")
      }
    })

    const pagination = get(Pagination)

    return db.getAll("words", null, pagination.currentPage * 20)
  },
})