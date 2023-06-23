import Image from "next/image";
import styles from "./page.module.css";
import Title from "./components/Title/Title";
import Button from "./components/Button/Button";
import Text from "./components/Text/Text";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/splash.svg"
        width={325}
        height={288}
        alt="Picture of the author"
      />
      <Title text="Welcome to Pokédex" />
      <Text text="The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world." />
      <Button text="Get Started" href="/list" />
    </main>
  );
}
