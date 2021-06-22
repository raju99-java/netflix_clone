import React from "react";
import userIcon from "../../images/userIcon.jpg";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.ring} />
        <img className={styles.logo} src={userIcon} alt="" />
      </div>
    </div>
  );
}
