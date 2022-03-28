import {useRecoilState} from "recoil";
import {RenderDispatcher} from "../states/render-dispatcher";

export function useRenderDispatcher() {
  const [_, setDispatch] = useRecoilState(RenderDispatcher)

  return () => {
    setDispatch((c) => c + 1)
  }
}