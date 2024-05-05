import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/components/drawer";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import useCurrentTime from "@/hook/useCurrentTime";
import useMission from "@/hook/useMission";
import { useRouter } from "next/router";
import useNickname from "@/hook/useNickname";
import { css } from "@emotion/react";
import Image from "next/image";
import DisplayAds from "@/components/display-ads/display-ads";

const Home = () => {
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setFirstRender(true);
  }, [ref]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // 현재 시간 가져오기 (시:분:초)
  const currentTime = useCurrentTime(1000);

  const { missionData } = useMission();
  const { alias } = useNickname();
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
      <div
        css={WrapperStyle}
        ref={ref}
        style={{ visibility: firstRender ? "visible" : "hidden" }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "baseline",
            marginBottom: "20px",
            visibility: firstRender ? "visible" : "hidden",
          }}
        >
          <p style={{ fontSize: "28px", fontFamily: "EF_jejudoldam" }}>
            {nickname}
          </p>
          <p style={{ fontFamily: "EF_jejudoldam" }}>{alias}</p>
        </div>
        <p
          style={{
            fontSize: "20px",
            marginBottom: "50px",
          }}
        >
          {currentTime}
        </p>
        {messageOpenTime ? (
          <>
            <Image src="/img/home_1.png" alt="" width={100} height={100} />
            <p
              style={{
                fontFamily: "EF_jejudoldam",
              }}
            >
              미션 오픈 시간입니다.
            </p>
            <p>{remainingTime}</p>
            <button onClick={() => router.push("/daily")}>데일리 미션</button>
          </>
        ) : (
          <>
            {missionSuccess ? (
              <>
                <Image src="/img/home_2.png" alt="" width={300} height={220} />
                <p
                  style={{
                    marginTop: "80px",
                    fontSize: "28px",
                    fontFamily: "EF_jejudoldam",
                  }}
                >
                  미션 성공!
                </p>
                <p>{message}</p>
              </>
            ) : (
              <>
                <Image
                  src="/img/home_3.png"
                  alt="fail-mission"
                  width={300}
                  height={220}
                />
                <p
                  style={{
                    marginTop: "80px",
                    fontSize: "28px",
                    fontFamily: "EF_jejudoldam",
                  }}
                >
                  미션 실패!
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "28px",
                    fontFamily: "EF_jejudoldam",
                  }}
                >
                  내일 다시 도전해보세요!
                </p>
              </>
            )}
          </>
        )}
      </div>
      <DisplayAds />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Home;

const WrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
});
