import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Tutorial() {
  const router = useRouter();

  // 튜토리얼 메세지
  interface TutorialSlide {
    id: number;
    title: string;
    imgSrc: string;
    description: string;
  }

  // TO DO : 튜토리얼 이미지 url 수정
  const tutorialSlides = [
    {
      id: 0,
      title: "디어바오로부터 도착한 쪽지",
      imgSrc: `/img/tutorial/tutorial_1.png`,
      description: `매일 오전 9시, 푸바오가 질문이 담긴 쪽지를 보내요!\n
      쪽지를 클릭해 질문을 확인해보세요\n
      오후 8시 59분까지 쪽지에 대한 편지를 보낼 수 있답니다`,
    },
    {
      id: 1,
      title: "푸바오의 답장",
      imgSrc: `/img/tutorial/tutorial_2.png`,
      description: `편지를 보냈다면 매일 오후 9시, 답장을 받을 수 있어요\n
      푸바오가 내 이름을 불러주며 보내는 답장을 받아보세요`,
    },
    {
      id: 2,
      title: "내 앨범 속 푸바오의 답장",
      imgSrc: `/img/tutorial/tutorial_3.png`,
      description: `
      받은 답장을 캘린더에 모아볼 수 있어요\n
      편지지에 담긴 답장을 다운로드 해서 간직할 수도 있답니다!
      `,
    },
  ];

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {tutorialSlides.map((slide: TutorialSlide) => (
        <SwiperSlide
          key={slide.id}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "10px",
              padding: "0px 20px",
            }}
          >
            <Image
              src={slide.imgSrc}
              alt={slide.title}
              width={100}
              height={100}
            />
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                margin: "25px 0px 7px 0px",
                fontFamily: "EF_jejudoldam",
              }}
            >
              {slide.title}
            </h2>
            <p
              style={{
                fontSize: "15px",
                whiteSpace: "pre-line",
              }}
            >
              {slide.description}
            </p>
            {slide.id === 2 ? (
              <Button
                variants="primary"
                onClick={() => router.push("/onboarding")}
                style={{
                  marginTop: "20px",
                }}
              >
                시작하기
              </Button>
            ) : (
              <div
                style={{
                  width: "80%",
                  height: "52px",
                }}
              ></div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// const tutorilSlideStyle = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

// const title = css`
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 1rem 0;
// `;

// const description = css`
//   font-size: 1.5rem;
//   margin: 1rem 0;
//   white-space: pre-line;
// `;
