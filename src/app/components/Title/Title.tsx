// import sass styles
import styles from "./Title.module.scss";

type TitleProps = {
  text: string;
  size?: string;
};
const Title = ({ text, size }: TitleProps) => {
  return (
    <div className={styles.title}>
      {text}
    </div>
  );
};

export default Title;
