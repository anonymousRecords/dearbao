import { css } from "@emotion/react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function Input({
  value,
  onChange,
  placeholder,
  maxLength,
}: InputProps) {

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      css={inputStyle}
    />
  );
}

const inputStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "17px",
  fontWeight: "600",
  borderRadius: "8px",
  width: "100%",
  height: "52px",
  boxShadow: "0px 0px 16px 2px rgba(0, 0, 0, 0.02)",
  border: "1px solid #D9D9D9",
  padding: "0 16px",
  outline: "none",
  ":focus": {
    border: "2px solid #D9D9D9",
  },
});
