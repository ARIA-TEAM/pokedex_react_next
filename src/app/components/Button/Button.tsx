"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./Button.module.scss";

type ButtonProps = {
  text?: string;
  href?: string;
  style?: string;
  icon?: string;
  onClick?: () => void;
  pokemon?: any;
  toggleFavorite?: any;
  handlePageChange?: any;
  tab?: any;
  currentPage?: string;
};
const Button = ({
  text,
  href = "",
  style,
  icon,
  toggleFavorite,
  pokemon,
  handlePageChange,
  tab,
  currentPage,
  onClick
}: ButtonProps) => {
  const buttonClasses =
    icon && !text
      ? `${styles.button} ${styles.icon}`
      : `${styles.button} ${currentPage === tab ? "" : styles.active} ${
          icon ? styles.with_icon : ""
        }`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (toggleFavorite && pokemon) {
      event.preventDefault();
      toggleFavorite(pokemon);
    } else if (handlePageChange && tab) {
      event.preventDefault();
      handlePageChange(tab);
    } else {
      event.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <Link className={buttonClasses} href={href} onClick={handleClick}>
      {icon && text && (
        <Image src={icon} alt="Button icon" width={20} height={20} />
      )}
      {icon && !text && (
        <Image src={icon} alt="Button icon" width={40} height={40} />
      )}
      {text && <div className={style}>{text}</div>}
    </Link>
  );
};

export default Button;
