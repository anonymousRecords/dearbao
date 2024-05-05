import { ScratchableImage } from "@/components/scratchable-image";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Onboarding = () => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [scratch, setScratch] = useState(false);

  const toggleBounceAnimation = () => {
    setIsBouncing(!isBouncing);
  };

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process
      .env.NEXT_PUBLIC_KAKAO_REST_API_KEY!}&redirect_uri=${
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
    }&response_type=code`;
  };

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
          color: "#1E212B",
          textAlign: "center",
          fontFamily: "EF_jejudoldam",
        }}
      >
        DEAR BAO
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#1E212B",
          textAlign: "center",
          fontFamily: "EF_jejudoldam",
        }}
      >
        푸바오와의 추억을 다시 꺼내볼까요?
      </p>
      <ScratchableImage
        onScratchEnd={() => {
          setScratch(true);
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 1.2, repeat: Infinity, repeatType: "reverse" },
        }}
      >
        <p style={{ color: "#4D5159" }}>이미지를 긁어보세요!</p>
      </motion.div>
      {/* 카카오 로그인 */}
      <motion.div
        onClick={toggleBounceAnimation}
        animate={{
          scale: isBouncing ? [1, 0.98, 1.1] : 1,
        }}
        transition={{
          scale: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
        }}
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
          onClick={kakaoLogin}
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
      </motion.div>
    </div>
  );
};

export default Onboarding;

const transitionValues = {
  duration: 0.8,
  yoyo: Infinity,
  ease: "easeOut",
};
