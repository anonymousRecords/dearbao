import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { BottomSheet } from "../bottom-sheet/bottom-sheet";
import { Button } from "../button";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = {
  id: string;
  name: string;
  title: string;
};

const navigationList: TabType[] = [
  {
    id: "1",
    name: "collecting",
    title: "모아보기",
  },
  {
    id: "2",
    name: "contact",
    title: "문의하기",
  },
];

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  // TO DO: accessToken 값 수정 필요
  const accessToken = "accessToken";

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env
      .NEXT_PUBLIC_KAKAO_REST_API_KEY!}&redirect_uri=${
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
    }&response_type=code`;
  };

  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 1000 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          css={MotionStyle}
        >
          <div css={BaseStyle}>
            <header css={HeaderStyle}>
              <img
                src="/svg/close-white.svg"
                alt="close-button"
                onClick={onClose}
              />
            </header>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            >
              {/* TO DO : 닉네임 & 호칭 데이터로 수정 */}
              <div css={NicknameStyle}>
                <h3>닉네임</h3>
                <p>호칭</p>
              </div>
            </motion.div>
            {navigationList.map((tab) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                css={ButtonStyle}
                onClick={() => {
                  router.push(`/${tab.name}`);
                  onClose();
                }}
              >
                <p>{tab.title}</p>
                <img src="/svg/arrow-right.svg" alt="arrow-right" />
              </motion.div>
            ))}
            <div css={accountStyle}>
              {accessToken ? (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                >
                  <div css={accountButtonBoxStyle}>
                    <BottomSheet.Root>
                      <BottomSheet.Trigger>
                        <p css={accountButtonStyle}>로그아웃</p>
                      </BottomSheet.Trigger>
                      <BottomSheet.Portal>
                        <BottomSheet.Content>
                          로그아웃 하시겠어요?
                          <BottomSheet.BottomCTA>
                            <Button variants="secondary"> 로그아웃</Button>
                            <BottomSheet.Close asChild>
                              <Button variants="quaternary">닫기</Button>
                            </BottomSheet.Close>
                          </BottomSheet.BottomCTA>
                        </BottomSheet.Content>
                        <BottomSheet.Overlay />
                      </BottomSheet.Portal>
                    </BottomSheet.Root>
                    <BottomSheet.Root>
                      <BottomSheet.Trigger>
                        <button css={accountButtonStyle}>회원탈퇴</button>
                      </BottomSheet.Trigger>
                      <BottomSheet.Portal>
                        <BottomSheet.Content>
                          회원탈퇴 하시겠어요?
                          <BottomSheet.BottomCTA>
                            <Button variants="secondary"> 회원탈퇴</Button>
                            <BottomSheet.Close asChild>
                              <Button variants="quaternary">닫기</Button>
                            </BottomSheet.Close>
                          </BottomSheet.BottomCTA>
                        </BottomSheet.Content>
                        <BottomSheet.Overlay />
                      </BottomSheet.Portal>
                    </BottomSheet.Root>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                  css={accountButtonStyle}
                >
                  <BottomSheet.Root>
                    <BottomSheet.Trigger>
                      <p css={accountButtonStyle}>로그인</p>
                    </BottomSheet.Trigger>
                    <BottomSheet.Portal>
                      <BottomSheet.Content>
                        로그인 하시겠어요?
                        <BottomSheet.BottomCTA>
                          <button
                            css={kakaoButtonStyle}
                            onClick={() => kakaoLogin()}
                          >
                            <Image
                              alt="kakao"
                              src="/svg/kakao-logo.svg"
                              width={18}
                              height={18}
                            />
                            카카오톡 로그인
                          </button>
                        </BottomSheet.BottomCTA>
                      </BottomSheet.Content>
                      <BottomSheet.Overlay />
                    </BottomSheet.Portal>
                  </BottomSheet.Root>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const MotionStyle = css({
  position: "absolute",
  top: 0,
  zIndex: 1000,
  width: "100%",
  minWidth: "390px",
  maxWidth: "450px",
});

const BaseStyle = css({
  height: "100vh",
  background: "#1E212B",
  padding: "24px",
  color: "white",
  position: "fixed",
  width: "100%",
  minWidth: "390px",
  maxWidth: "450px",
});

const HeaderStyle = css({
  height: "39px",
  marginBottom: "20px",
  img: {
    cursor: "pointer",
  },
});

const NicknameStyle = css({
  display: "flex",
  alignItems: "end",
  marginBottom: "20px",
  h3: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  p: {
    fontSize: "15px",
    marginLeft: "10px",
  },
});

const ButtonStyle = css({
  cursor: "pointer",
  background: "none",
  height: "56px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "18px",
  margin: "10px 0px",
});

const accountStyle = css({
  display: "flex",
  // TO DO: margin-top 임의 값 수정 필요
  marginTop: "460px",
  gap: "40px",
});

const accountButtonStyle = css({
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "15px",
  cursor: "pointer",
});

const accountButtonBoxStyle = css({
  display: "flex",
  padding: "18px 0px",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  cursor: "pointer",
});

const kakaoButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "56px",
  borderRadius: "16px",
  backgroundColor: "#fee500",
  color: "#000000",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  gap: "28px",
});
