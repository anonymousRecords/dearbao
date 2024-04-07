import { css } from "@emotion/react";

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  currentLength?: number;
  maxLength?: number;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  currentLength,
  maxLength,
}: TextAreaProps) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        css={textAreaStyle}
      />
      <div style={{ display: "flex", justifyContent: 'flex-end' }}>
        <p css={lengthStyle}>{currentLength}</p>
        <p css={lengthStyle}>/</p>
        <p css={lengthStyle}>{maxLength}</p>
      </div>
    </div>
  );
}

const textAreaStyle = css({
  width: "100%",
  height: "200px",
  backgroundColor: "white",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "600",
  padding: "16px",
  ":focus": {
    outline: "none",
  },
});

const lengthStyle = css({
  color: "#D9D9D9",
  fontSize: "14px",
});
