import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { css } from "@emotion/react";
import "swiper/css";
import "swiper/css/pagination";
import { Header } from "../header";
import { IconButton } from "../icon-button";
import { MyMission } from "@/data/type";
import useNickname from "@/hook/useNickname";

interface ModalProps {
  missionData: MyMission[];
  closeModal: () => void;
}

export default function Modal({ closeModal, missionData }: ModalProps) {
  // missisonData를 받아서 modalData에 담아서 출력
  const modalData: string[] = [];
  
  missionData.forEach((mission) => {
    modalData.push(mission.missionContent);
    modalData.push(mission.missionAnswer);
    modalData.push(mission.message);
  });
  
  // 모달 슬라이드 타이틀
  const { nickname } = useNickname();
  const slideTitles = ["데일리 미션", `${nickname}님의 답장`, "푸바오의 답장"];

  return (
    <div css={modalStyle}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        {modalData.map((modalData, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#D9D9D9",
                border: "1px solid #D9D9D9",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Header
                left={
                  <IconButton
                    imgSrc="/svg/close-white.svg"
                    width={25}
                    onClick={closeModal}
                  />
                }
                title=""
                right=""
              />
              <div
                style={{ width: "100%", height: "100%", padding: "0px 20px" }}
              >
                <h2 style={{ marginTop: "50px" }}>{slideTitles[index]}</h2>
                <h2 style={{ marginTop: "50px" }}>{modalData}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const modalStyle = css({
  position: "absolute",
  top: "5%",
  left: "8%",
  width: "300px",
  height: "300px",
  borderRadius: "8px",
  zIndex: 100,
});
