import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNickname } from "@/api/getNickname";

export function useNickname() {
  const {
    isLoading,
    isError,
    data: nicknameData,
  } = useQuery({
    queryKey: ["nickname"],
    queryFn: getNickname,
  });
  const [nickname, setNickname] = useState<string | undefined>();

  useEffect(() => {
    if (!isLoading && !isError) {
      setNickname(nicknameData?.data.nickname);
    }
  }, [nicknameData, isError, isLoading]);

  return { nickname, isLoading, isError };
}
