import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import useDailyMission from "@/hook/useDailyMission";
import { css } from "@emotion/react";
import { TextArea } from "@/components/text-area";
import { useRouter } from "next/router";
import { useState } from "react";
import { SnackBar } from "@/components/snack-bar";
import { useMutation } from "@tanstack/react-query";
import { postDailyMission } from "@/api/postDailyMission";

const Daily = () => {
  const router = useRouter();
  const { dailyMissionData } = useDailyMission();
  const [successSnackBar, setSuccessSnackBar] = useState<boolean>(false);

  const [dailyMission, setDailyMission] = useState<string>("");

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    setDailyMission(inputValue);
  };

  const handleDailyMissionButton = useMutation({
    mutationFn: postDailyMission,
    onSuccess: () => {
      console.log("편지 성공");
      setSuccessSnackBar(true);
      setTimeout(() => {
        setSuccessSnackBar(false);
      }, 1000);
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    },
  });

  return (
    <>
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
      <div css={WrapperStyle}>
        <p css={DailyMissionStyle}>{dailyMissionData?.content}</p>
        <div>
          <TextArea
            value={dailyMission}
            currentLength={dailyMission.length}
            maxLength={400}
            placeholder="푸바오에게 답장을 적어주세요."
            onChange={handleTextAreaChange}
          />
        </div>
        <div style={{ marginTop: "360px" }}>
          <Button
            variants="primary"
            disabled={dailyMission.length === 0}
            onClick={() => handleDailyMissionButton.mutate(dailyMission)}
          >
            편지 보내기
          </Button>
        </div>
      </div>
      <SnackBar
        message="푸바오에게 편지가 발송되었어요."
        open={successSnackBar}
        onClose={() => {
          setSuccessSnackBar(false);
        }}
      />
    </>
  );
};

export default Daily;

const WrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
  height: "100vh",
});

const DailyMissionStyle = css({
  color: "white",
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "30px",
  textAlign: "center",
});
