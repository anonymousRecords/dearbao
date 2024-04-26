import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNickname } from "@/api/getNickname";


const useNickname = () => {
  const { data } = useQuery({
    queryKey: ["nickname"],
    queryFn: getNickname,
  });

  return { nickname: data?.data.nickname, alias: data?.data.alias};
};

export default useNickname;
