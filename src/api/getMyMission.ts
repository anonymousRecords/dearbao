import { APIResponse, MyMission } from "@/data/type";
import { baseAxios } from "./baseAxios";

export const getMyMission = async () => {
  const data =
    await baseAxios.get<APIResponse<MyMission[]>>(`/api/v1/mission/my`);
  return data.data;
};
