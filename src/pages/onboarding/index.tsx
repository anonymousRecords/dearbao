import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

const Onboarding = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        height: "100vh",
      }}
    >
      <p
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        DEAR BAO
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        푸바오와의 추억을 다시 꺼내볼까요?
      </p>
      <Image
        src="/img/tutorial/tutorial-1.jpeg"
        alt="onboarding"
        width={354}
        height={354}
        style={{ borderRadius: "8px" }}
      />
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
      >
        <button
          style={{
            backgroundColor: "#FFEB00",
            color: "#000000",
            fontSize: "17px",
            fontWeight: "600",
            borderRadius: "8px",
            width: "354px",
            height: "52px",
            boxShadow: "0px 0px 16px 2px rgba(0, 0, 0, 0.02)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Image
            src="/svg/kakao-logo.svg"
            alt="kakao"
            width={20}
            height={20}
            css={{ marginRight: "10px" }}
          />
          카카오 로그인
        </button>
      </Link>
    </div>
  );
};

export default Onboarding;
