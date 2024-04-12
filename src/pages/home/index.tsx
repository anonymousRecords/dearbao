import { useState } from "react";
import { Drawer } from "@/components/drawer";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import useCurrentTime from "@/hook/useCurrentTime";
import useMission from "@/hook/useMission";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // 현재 시간 가져오기 (시:분:초)
  const currentTime = useCurrentTime(1000);

  const { missionData } = useMission();
  const nickname = missionData?.nickname;
  const messageOpenTime = missionData?.messageOpenTime;
  const missionSuccess = missionData?.missionSuccess;
  const remainingTime = missionData?.remainingTime;
  const message = missionData?.message;

  return (
    <>
      <Header
        left=""
        title=""
        right={
          <IconButton imgSrc="/svg/menu.svg" width={25} onClick={openDrawer} />
        }
      />
      <p>{nickname}</p>
      <p>{currentTime}</p>
      {messageOpenTime ? (
        <>
          <p>미션 오픈 시간입니다.</p>
          <p>{remainingTime}</p>
        </>
      ) : (
        <>
          <p>미션 오픈 시간이 아닙니다!</p>
          <p>{String(missionSuccess)}</p>
          <p>{message}</p>
          <button onClick={() => router.push("/daily")}>데일리 미션</button>
        </>
      )}

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Home;
