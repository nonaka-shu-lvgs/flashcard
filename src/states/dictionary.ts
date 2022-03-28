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
    const db = await openDB("flashcard", 1, {
      async upgrade(db) {
        db.createObjectStore("words")
      }
    })

    const pagination = get(Pagination)

    const count = await db.count("words")

    if (count < 1) {
      await Promise.all(firstWords.map(w => db.add("words", w, w.en)))
    }

    return db.getAll("words", null, pagination.currentPage * 20)
  },
})

const firstWords = [
  {
    en: "abroad",
    ja: "外国で"
  },
  {
    en: "bear",
    ja: "クマ"
  },
  {
    en: "become",
    ja: "〜になる"
  },
  {
    en: "center",
    ja: "中央"
  },
  {
    en: "chalk",
    ja: "チョーク"
  },
  {
    en: "dry",
    ja: "乾く"
  },
  {
    en: "dump",
    ja: "ゴミ捨て場"
  },
  {
    en: "ear",
    ja: "耳"
  },
  {
    en: "else",
    ja: "他に"
  },
  {
    en: "far",
    ja: "遠く"
  },
  {
    en: "grass",
    ja: "草"
  },
  {
    en: "grade",
    ja: "学年"
  },
  {
    en: "heart",
    ja: "心"
  },
  {
    en: "invite",
    ja: "招待する"
  },
  {
    en: "key",
    ja: "鍵"
  },
  {
    en: "moon",
    ja: "月"
  },
  {
    en: "pencil",
    ja: "鉛筆"
  },
  {
    en: "right",
    ja: "正しい"
  },
  {
    en: "shop",
    ja: "店"
  },
  {
    en: "test",
    ja: "試験"
  },
]