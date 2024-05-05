import { useState, useEffect } from "react";
import { getMission } from "@/api/getMission";
import { Mission } from "@/data/type";

const useMission = () => {
  const [missionData, setMissionData] = useState<Mission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMissionData = async () => {
    try {
      const response = await getMission();

      const data: Mission = response.data;

      // remainingTime이 존재할 경우 (09:00:00 - 20:59:59)
      if (data.remainingTime) {
        setMissionData({
          nickname: data.nickname,
          remainingTime: data.remainingTime,
          messageOpenTime: data.messageOpenTime,
          missionSuccess: data.missionSuccess,
        });
      } else {
        // remainingTime이 존재하지 않을 경우 (21:00:00 - 08:59:59)
        setMissionData({
          nickname: data.nickname,
          message: data.message,
          messageOpenTime: data.messageOpenTime,
          missionSuccess: data.missionSuccess,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("에러 발생", error);
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 한 번만 API 호출
  useEffect(() => {
    fetchMissionData();
  }, []);
  
  // 미션 데이터 및 로딩 상태 반환
  return { missionData, loading };
};

export default useMission;
