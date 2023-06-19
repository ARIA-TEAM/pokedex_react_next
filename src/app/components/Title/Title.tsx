type TitleProps = {
  text: string;
  size?: string;
};
const Title = ({ text, size }: TitleProps) => {
  return (
    <div className={size}>
      {text}
    </div>
  );
};

export default Title;
