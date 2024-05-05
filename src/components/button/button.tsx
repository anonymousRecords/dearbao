import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useState } from "react";

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
    backgroundColor: "#4D5159",
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
  const [isBouncing, setIsBouncing] = useState(false);

  const toggleBounceAnimation = () => {
    setIsBouncing(!isBouncing);
  };

  return (
    <motion.div
      onClick={toggleBounceAnimation}
      animate={{
        scale: isBouncing ? [1, 0.95, 1.1] : 1,
      }}
      transition={{
        scale: { duration: 0.3 },
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <button type={type} disabled={disabled} css={buttonStyle} {...props}>
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
