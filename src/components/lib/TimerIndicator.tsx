import React, {useCallback, useEffect, useState} from "react";
import {LinearProgress, LinearProgressProps} from "@mui/material";

type Props = {
  time: number,
  resolution?: number,
  onExceeded?: () => void,
  color?: LinearProgressProps["color"]
}

const percentage = (base: number) => (current: number) => Math.floor(current / base * 100)

export const TimerIndicator: React.VFC<Props> = ({time, onExceeded, resolution = 100, color = "inherit"}) => {
  const percentageCal = useCallback(percentage(time), [time])
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const clear = () => {
      clearInterval(timer)
    }

    const timer = setInterval(() => {
      if (progress < (0 - percentageCal(resolution))) {
        onExceeded && onExceeded()

        return clear
      }

      setProgress(progress - percentageCal(resolution))
    }, resolution)

    return clear
  }, [progress, resolution])

  return <LinearProgress variant="determinate" value={progress} color={color}/>
}