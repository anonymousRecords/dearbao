import { APIResponse, DailyMission } from "@/data/type";
import { baseAxios } from "./baseAxios";

export const getDailyMission = async () => {
  const data =
    await baseAxios.get<APIResponse<DailyMission>>(`api/v1/mission/daily`);
  return data.data;
};
