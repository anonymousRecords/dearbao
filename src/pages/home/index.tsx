import { useState } from "react";
import { Drawer } from "@/components/drawer";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <Header
        left=""
        title=""
        right={
          <IconButton imgSrc="/svg/menu.svg" width={25} onClick={openDrawer} />
        }
      />
      <button>데일리 미션 버튼</button>
      <p>홈 화면</p>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Home;
