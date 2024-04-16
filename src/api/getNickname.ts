import { APIResponse, Nickname } from "@/data/type";
import { baseAxios } from "./baseAxios";

export const getNickname = async () => {
  const data = await baseAxios.get<APIResponse<Nickname>>(
    `api/v1/member/nickname`
  );
  return data.data;
};
