import { useQuery } from "@tanstack/react-query";
import { getDailyMission } from "@/api/getDailyMission";

const useDailyMission = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dailyMission"],
    queryFn: getDailyMission,
  });

  return {
    dailyMissionData: data ? data.data : null,
    isLoading,
    error,
  };
};

export default useDailyMission;
