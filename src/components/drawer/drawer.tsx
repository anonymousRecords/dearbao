import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { BottomSheet } from "../bottom-sheet/bottom-sheet";
import { Button } from "../button";
import { postLogout } from "@/api/postLogout";
import { deleteDeactivation } from "@/api/deleteDeactivation";
import { useNickname } from "@/hook/useNickname";

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
    name: "inquire",
    title: "문의하기",
  },
];

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();

  const { nickname, alias } = useNickname(); 

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
              <div css={NicknameStyle}>
                <h3>{nickname}</h3>
                <p>{alias}</p>
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
                          <Button
                            variants="secondary"
                            onClick={async () => {
                              await postLogout();
                              router.push("/onboarding");
                            }}
                          >
                            {" "}
                            로그아웃
                          </Button>
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
                          <Button
                            variants="secondary"
                            onClick={async () => {
                              await deleteDeactivation();
                              router.push("/onboarding");
                            }}
                          >
                            회원탈퇴
                          </Button>
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
  marginTop: "360px",
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
