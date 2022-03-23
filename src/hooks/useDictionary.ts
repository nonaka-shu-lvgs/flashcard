import {Word} from "../states/dictionary";

export function useDictionary(page: number) {
  const words: Word[] = [
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

  return {
    words
  }
}