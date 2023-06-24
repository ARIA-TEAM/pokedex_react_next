// import sass styles
import Image from "next/image";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.pokeball}
        src="/Loader.svg"
        width={105}
        height={105}
        alt="Loader"
        priority={true}
      />
      Loading...
    </div>
  );
};

export default Loader;
