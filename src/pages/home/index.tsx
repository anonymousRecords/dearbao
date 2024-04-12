import { useState } from "react";
import { Drawer } from "@/components/drawer";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { useNickname } from "@/hook/useNickname";
import useCurrentTime from "@/hook/useCurrentTime";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // 닉네임 데이터 가져오기
  const { nickname } = useNickname();

  // 현재 시간 가져오기 (시:분:초)
  const currentTime = useCurrentTime(1000);
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
      <button>데일리 미션 버튼</button>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Home;
