import { getMyMission } from "@/api/getMyMission";
import { useQuery } from "@tanstack/react-query";

const useMyMission = () => {
  const { data } = useQuery({
    queryKey: ["myMission"],
    queryFn: getMyMission,
  });
  return { missionData: data };
};

export default useMyMission;
