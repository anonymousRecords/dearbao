import { Calendar } from "@/components/calendar";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

const Collecting = () => {
  const router = useRouter();

  return (
    <div css={WrapperStyle}>
      <Header
        left={
          <IconButton
            imgSrc="/svg/arrow-left.svg"
            width={18}
            onClick={() => router.back()}
          />
        }
        title=""
        right=""
      />
      <div>
        <p css={GuideStyle}>
          푸바오와 나의
          <br /> 추억을 모아보세요!
        </p>
        <Calendar />
      </div>
    </div>
  );
};

const WrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})

const GuideStyle = css({
  fontSize: "22px",
  fontWeight: "bold",
  marginTop: "100px",
  marginBottom: "60px",
  color: "#FFFFFF",
  textAlign: "center",
  lineHeight: "1.3",
});

export default Collecting;
