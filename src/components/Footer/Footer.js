import React from "react";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.icons}>
        <i className="fab fa-facebook-f" />
        <i className="fab fa-instagram" />
        <i className="fab fa-youtube" />
      </div>
      <div className={styles.container}>
        <div className={styles.col}>
          <div className={styles.row}>Audio and Subtitles</div>
          <div className={styles.row}>Help Center</div>
          <div className={styles.row}>Media Center</div>
          <div className={styles.row}>Jobs</div>
          <div className={styles.row}>Privacy</div>
          <div className={styles.row}>Cookie preferences</div>
          <div className={styles.row}>Contact us</div>
        </div>
        <div className={styles.col}>
          <div className={styles.row}>Audio Description</div>
          <div className={styles.row}>Gift cards</div>
          <div className={styles.row}>Investor Relations</div>
          <div className={styles.row}>Terms of Use</div>
          <div className={styles.row}>Legal Notices</div>
          <div className={styles.row}>Corporate information</div>
          <div className={styles.row} />
        </div>
      </div>
      <div className={styles.btn}> Service code</div>
    </div>
  );
}
