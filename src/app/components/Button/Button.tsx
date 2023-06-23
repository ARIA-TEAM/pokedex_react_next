import Link from "next/link";
import Image from "next/image";

import styles from "./Button.module.scss";

type ButtonProps = {
  text?: string;
  href?: string;
  style?: string;
  icon?: string;
  onClick?: () => void;
};
const Button = ({ text, href = "", style, icon }: ButtonProps) => {
  const buttonClasses = icon ? `${styles.button} ${styles.icon}` : styles.button;

  return (
    <Link className={buttonClasses} href={href}>
      {icon && <Image src={icon} alt="Button icon" width={40} height={40} />}
      {text && <div className={style}>{text}</div>}
    </Link>
  );
};

export default Button;
