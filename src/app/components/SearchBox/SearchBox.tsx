import styles from "./SearchBox.module.scss";

const SearchBox = () => {
    return (
        <div className={styles.searchbox}>
            <input type="text" className={styles.searchbox__input} placeholder="Search..." />
        </div>
    );
}
 
export default SearchBox;