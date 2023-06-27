import styles from "./SearchBox.module.scss";

// define props
interface SearchBoxProps {
  handleSearch: (query: string) => void;
}

const SearchBox = ({ handleSearch }: SearchBoxProps) => {
  return (
    <div className={styles.searchbox}>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchbox__input}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
