type TextProps = {
    text: string;
    size?: string;
  };
  const Text = ({ text, size }: TextProps) => {
    return (
      <div className={size}>
        {text}
      </div>
    );
  };
  
  export default Text;
  