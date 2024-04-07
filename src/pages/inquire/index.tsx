import { useState } from "react";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { SnackBar } from "@/components/snack-bar";
import { TextArea } from "@/components/text-area";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

const MakeInquire = () => {
  const router = useRouter();
  const [inquireEmail, setInquireEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [inquireTitle, setInquireTitle] = useState<string>("");
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [inquireContent, setInquireContent] = useState<string>("");
  const [successSnackBar, setSuccessSnackBar] = useState<boolean>(false);

  // 이메일 입력
  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setInquireEmail(inputValue);
    validateEmailInput(inputValue);
  };

  const validateEmailInput = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length === 0) {
      setEmailErrorMessage("이메일을 입력해주세요.");
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailErrorMessage("");
    }
  };

  // 문의 제목
  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setInquireTitle(inputValue);
    validateTitleInput(inputValue);
    console.log("문의 제목", inquireTitle);
  };

  const validateTitleInput = (title: string) => {
    if (title.length === 0) {
      setTitleErrorMessage("문의 제목을 입력해주세요.");
    } else if (2 > title.length || title.length > 10) {
      setTitleErrorMessage("문의 제목은 2 ~ 10자 내로 작성해주세요.");
    } else {
      setTitleErrorMessage("");
    }
  };

  // 문의 내용
  const handleContentTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    setInquireContent(inputValue);
    console.log("문의 내용", inquireContent);
  };

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
        title="문의하기"
        right=""
      />
      <div css={WrapperStyle}>
        <div style={{ marginTop: "30px", marginBottom: "120px" }}>
          <div css={InputContainerStyle}>
            <p css={TitleStyle}>문의 받을 이메일 주소</p>
            <Input
              placeholder="문의 받을 이메일 주소"
              value={inquireEmail}
              onChange={handleEmailInputChange}
            />
            {emailErrorMessage && (
              <p style={{ color: "#FF0000", fontSize: "14px" }}>
                {emailErrorMessage}
              </p>
            )}
          </div>
          <div css={InputContainerStyle}>
            <p css={TitleStyle}>문의 제목</p>
            <Input
              placeholder="문의 제목"
              value={inquireTitle}
              onChange={handleTitleInputChange}
            />
            {titleErrorMessage && (
              <p style={{ color: "#FF0000", fontSize: "14px" }}>
                {titleErrorMessage}
              </p>
            )}
          </div>
          <div css={InputContainerStyle}>
            <p css={TitleStyle}>문의 내용</p>
            <TextArea
              value={inquireContent}
              onChange={handleContentTextAreaChange}
              placeholder="문의 내용"
              maxLength={300}
              currentLength={inquireContent.length}
            />
          </div>
        </div>
        <Button
          variants="primary"
          disabled={
            emailErrorMessage.length > 0 ||
            titleErrorMessage.length > 0 ||
            inquireContent.length === 0
          }
          onClick={() => {
            setSuccessSnackBar(true);
            setTimeout(() => {
              setSuccessSnackBar(false);
            }, 1000);
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          }}
        >
          문의하기
        </Button>
      </div>
      <SnackBar
        message="문의가 성공적으로 전송되었습니다."
        open={successSnackBar}
        onClose={() => {
          setSuccessSnackBar(false);
        }}
      />
    </>
  );
};

const WrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
});

const InputContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  gap: "5px",
});

const TitleStyle = css({
  fontSize: "18px",
  fontWeight: "500",
  color: "#FFFFFF",
});

export default MakeInquire;
