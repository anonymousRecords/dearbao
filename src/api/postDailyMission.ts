import { APIResponse, DailyMission } from "@/data/type";
import { baseAxios } from "./baseAxios";

export const postDailyMission = async (content: string) => {
  const data = await baseAxios.post<APIResponse<DailyMission>>(
    `api/v1/mission/daily`,
    { content }
  );
  return data.data;
};
