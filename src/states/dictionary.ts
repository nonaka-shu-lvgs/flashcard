import {atom} from "recoil";

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