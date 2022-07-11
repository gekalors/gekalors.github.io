import React from "react";
import styles from "./styles.module.scss";
const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 >
        Нічого не знайдено
        <br />
        <icon>😕</icon>
      </h1>
      <p className={styles.description}>На жаль, ця сторінка відсутня у нашому інтернет-магазині</p>
    </div>
  );
};
export default NotFoundBlock;
