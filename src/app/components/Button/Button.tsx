import Link from "next/link";

import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  href: string;
  style?: string;
  icon?: string;
};
const Button = ({ text, href, style, icon }: ButtonProps) => {
  return (
    <Link className={styles.button} href={href}>
      {icon &&
        <div>
          {icon}
        </div>}
      <div className={style}>
        {text}
      </div>
    </Link>
  );
};

export default Button;
