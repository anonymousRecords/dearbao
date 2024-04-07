import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { css } from "@emotion/react";
import "swiper/css";
import "swiper/css/pagination";
import { Header } from "../header";
import { IconButton } from "../icon-button";

const dummyData = [
  {
    id: 0,
    content: "나 보러 왔을 때 내 사진 많이 찍어갔어?",
  },
  {
    id: 1,
    content: "편지 1",
  },
  {
    id: 2,
    content:
      "나를 사진으로 남겨줘서 고마워. 덕분에 돌멩이들이랑 할부지들이 많은 사진과 그 안에 담긴 애정으로 그리움을 이겨낼 것 같아서 푸야는 안심이야!",
  },
];

interface ModalProps {
  closeModal: () => void;
}

export default function Modal({ closeModal }: ModalProps) {
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
        {dummyData.map((data) => (
          <SwiperSlide key={data.id}>
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
                <h2 style={{ marginTop: "50px" }}>{data.content}</h2>
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
