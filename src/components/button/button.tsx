import React from "react";
import { css } from "@emotion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants: "primary" | "secondary" | "tertiary" | "quaternary";
  disabled?: boolean;
  onClick?: () => void;
}

const base = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "17px",
  fontWeight: "600",
  borderRadius: "8px",
  width: "100%",
  height: "52px",
  boxShadow: "0px 0px 16px 2px rgba(0, 0, 0, 0.02)",
  "&:disabled": {
    backgroundColor: "#D9D9D9",
    color: "white",
    cursor: "default",
  },
});

const variantsCss = {
  primary: css({
    backgroundColor: "#1E212B",
    color: "white",
  }),
  secondary: css({
    backgroundColor: "#009436",
    color: "white",
  }),
  tertiary: css({
    backgroundColor: "#FFFFFF",
    color: "#1E212B",
  }),
  quaternary: css({
    backgroundColor: "#A7C2B1",
    color: "#FFFFFF",
  }),
};

const Button: React.FC<ButtonProps> = ({
  variants,
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const buttonStyle = [base, variantsCss[variants]];

  return (
    <button type={type} css={buttonStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
