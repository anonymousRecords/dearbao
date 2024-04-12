import { useState } from "react";
import useInterval from "@/hook/useInterval";

const useCurrentTime = (delay: number) => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, delay);

  return currentTime;
};

export default useCurrentTime;
