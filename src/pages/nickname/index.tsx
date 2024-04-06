import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { css } from "@emotion/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postInit } from "../../api/postInit";
import { AdjectiveList } from "../../constants/adjective-list";
import { NounList } from "../../constants/noun-list";
import { SlangList } from "../../constants/slang-list";

const getRandomItem = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const NickName = () => {
  const router = useRouter();
  const [combinedText, setCombinedText] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectGender, setSelectGender] = useState<boolean>();

  // 닉네임 데이터 보내기
  const mutation = useMutation({
    mutationKey: ["postInit"],
    mutationFn: async () => {
      if (combinedText && selectGender !== undefined) {
        return postInit({
          nickName: combinedText,
          title: selectGender ? "FEMALE" : "MALE",
        });
      }
    },
    onSuccess: (data) => {
      console.log("닉네임 생성 성공", data);
      router.push("/home");
    },
  });

  useEffect(() => {
    // 자동 생성 닉네임
    const generateRandomText = () => {
      const randomAdjective = getRandomItem(AdjectiveList);
      const randomNoun = getRandomItem(NounList);
      const newCombinedText = `${randomAdjective}${randomNoun}`;

      setCombinedText(newCombinedText);
      validateInput(newCombinedText);
    };

    generateRandomText();
  }, []);

  // 닉네임 입력
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim().slice(0, 8);
    setCombinedText(inputValue);
    validateInput(inputValue);
  };

  // 닉네임 유효성 검사
  const validateInput = (inputValue: string) => {
    const isLengthValid = inputValue.length >= 2 && inputValue.length <= 8;
    const isFormatValid = /^\S+$/.test(inputValue);
    const containsSlang = SlangList.some((slang) => inputValue.includes(slang));

    if (!isLengthValid || inputValue.length === 0 || containsSlang) {
      setIsInputValid(false);

      if (containsSlang) {
        setErrorMessage("닉네임 규정에 어긋납니다.");
      } else {
        setErrorMessage("닉네임을 2~8자로 입력해주세요.");
      }
    } else {
      setIsInputValid(isLengthValid && isFormatValid && !containsSlang);
      setErrorMessage("");
    }
  };

  // 닉네임 전체 삭제
  const handleDeleteClick = () => {
    setCombinedText("");
    setIsInputValid(false);
    setErrorMessage("닉네임을 2~8자로 입력해주세요.");
  };

  // '다음으로' 버튼 클릭
  const handleNextClick = () => {
    if (isInputValid && selectGender !== undefined) {
      // TO DO : 서버에 닉네임 데이터 보내기 확인 후 alert 삭제
      alert("닉네임 생성 성공!");
      mutation.mutate();
    }
    router.push("/home");
  };

  return (
    <div css={WrapperStyle}>
      <p css={GuideStyle}>
        안녕 난 푸바오
        <br /> 넌 누구야?
      </p>
      <div style={{ marginBottom: "40px" }}>
        <p css={TitleStyle}>닉네임</p>
        <Input
          value={combinedText}
          onChange={handleInputChange}
          placeholder="국문/영/숫자 조합 공백없이 2-8자"
          maxLength={8}
        />
        <div style={{ position: "relative", margin: "5px" }}>
          {errorMessage && (
            <p style={{ color: "red", position: "absolute", left: "0px" }}>
              {errorMessage}
            </p>
          )}
          {combinedText && (
            <button
              onClick={handleDeleteClick}
              style={{ position: "absolute", right: "0px", color: "#979898" }}
            >
              전체 삭제
            </button>
          )}
        </div>
      </div>
      <div>
        <p css={TitleStyle}>성별</p>
        <div css={ButtonContainerStyle}>
          <button
            onClick={() => setSelectGender(true)}
            css={ButtonStyle}
            style={{
              color: selectGender === true ? "white" : "#A1A5AC",
              backgroundColor: selectGender === true ? "#A7C2B1" : "#FFFFFF",
              fontWeight: selectGender === true ? "bold" : "normal",
            }}
          >
            임오
          </button>
          <button
            onClick={() => setSelectGender(false)}
            css={ButtonStyle}
            style={{
              color: selectGender === false ? "white" : "#A1A5AC",
              backgroundColor: selectGender === false ? "#A7C2B1" : "#FFFFFF",
              fontWeight: selectGender === false ? "bold" : "normal",
            }}
          >
            삼튠
          </button>
        </div>
      </div>
      <Button
        variants="primary"
        disabled={!isInputValid || selectGender === undefined}
        onClick={handleNextClick}
      >
        다음으로
      </Button>
    </div>
  );
};

const WrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
  padding: "0px 20px",
});

const GuideStyle = css({
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "100px",
  marginBottom: "60px",
  color: "#FFFFFF",
  textAlign: "center",
  lineHeight: "1.3",
});

const TitleStyle = css({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#FFFFFF",
});

const ButtonContainerStyle = css({
  display: "flex",
  gap: "10px",
  margin: "20px 0px 220px 0px",
  color: "#FFFFFF",
});

const ButtonStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "17px",
  fontWeight: "400",
  borderRadius: "8px",
  width: "100%",
  height: "52px",
  boxShadow: "0px 0px 16px 2px rgba(0, 0, 0, 0.02)",
  backgroundColor: "#FFFFFF",
  color: "A1A5AC",
});

export default NickName;
