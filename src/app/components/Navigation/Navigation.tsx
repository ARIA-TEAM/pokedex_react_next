import { useCallback } from "react";
import styles from "./Navigation.module.scss";

import Button from "../Button/Button";

type NavigationProps = {
  handlePageChange: (page: string) => void;
  currentPage: string; // To change button style if active
};

const Navigation = ({ handlePageChange, currentPage }: NavigationProps) => {
  const handleAllClick = useCallback(
    () => handlePageChange("all"),
    [handlePageChange]
  );
  const handleFavoritesClick = useCallback(
    () => handlePageChange("favorites"),
    [handlePageChange]
  );

  return (
    <div className={styles.navigation}>
      <Button
        currentPage={currentPage}
        tab="all"
        handlePageChange={handleAllClick}
        text="All"
        icon="/all_icon.svg"
        />
      <Button
        currentPage={currentPage}
        tab="favorites"
        handlePageChange={handleFavoritesClick}
        text="Favorites"
        icon="/white_star.svg"
      />
    </div>
  );
};

export default Navigation;
