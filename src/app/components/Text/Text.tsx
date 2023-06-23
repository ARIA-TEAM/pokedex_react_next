import styles from './Text.module.scss';

type TextProps = {
    text: string;
    size?: string;
  };
  const Text = ({ text, size }: TextProps) => {
    return (
      <div className={styles.text}>
        {text}
      </div>
    );
  };
  
  export default Text;
  