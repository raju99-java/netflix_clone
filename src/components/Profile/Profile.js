import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import userIcon from "../../images/userIcon.jpg";

// Breakpoints = 0-450 = mobile. 450-667 = tablet, 668 = desktop

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    auth.getProfile((profile, error) => {
      setProfile(profile);
      setError(error);
    });
  }, [profile, error]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <p>Account</p>
        </div>
        <div className={styles.innerContainer}>
          <div>
            {" "}
            <div>
              <p className={styles.subTitle}>Membership & Billing</p>
              <button className={styles.cancelBtnDesktop}>
                Cancel Membership
              </button>
            </div>
          </div>
          <div className={styles.innerContainer__userInfoContainer}>
            <div className={styles.subContainer}>
              <div>
                <div className={styles.name}>
                  {profile.name == null ? "John Doe" : profile.name}
                </div>
                <div className={styles.password}>Password: *******</div>
                <div className={styles.phone}>Phone: 0123 123 123</div>
              </div>
              <div className={`${styles.hasLinks} ${styles.alignRight}`}>
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  Change account Email
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  Change password
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  Change phone number
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
              </div>
            </div>
            <div className={styles.subContainer}>
              <div
                className={`${styles.tile} ${styles.lineBreak} 
              `}
              >
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  <i
                    className={`${"fab fa-cc-visa"} ${styles.creditCardIcon}`}
                  />{" "}
                  1234 1234 1234 1234
                </div>
                <div />
              </div>
              <div className={`${styles.hasLinks} ${styles.alignRight}`}>
                {" "}
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  Update Payment info
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
                <div className={`${styles.tile} ${styles.lineBreak} `}>
                  Billing details
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
              </div>
            </div>
            <div className={`${styles.tile} ${styles.lineBreak}`}>
              <div className={`${styles.hasLinks} ${styles.alignRight}`}>
                {" "}
                <div>
                  Redeem gift card or promo code
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
                <div>
                  Where to buy gift cards
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
              </div>
              <button className={styles.cancelBtnMobile}>
                Cancel Membership
              </button>
            </div>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.subContainer}>
            <div>
              <p className={styles.subTitle}>Plan Details</p>
            </div>

            <div>
              <div className={`${styles.tile} ${styles.lineBreak} `}>
                <div className={`${styles.hasLinks} ${styles.alignRight}`}>
                  Change Plan
                  <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div>
            <p className={styles.subTitle}>Settings</p>
          </div>
          <div className={styles.hasLinks}>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Parental controls
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Test participation
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Manage download devices
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Activate a device
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Recent device streaming activity
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Sign out of all devices
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div>
            <p className={styles.subTitle}>My Profile</p>
          </div>
          <div className={styles.hasLinks}>
            <div className={`${styles.tile}  `}>
              <img
                className={styles.img}
                src={userIcon}
                alt="Profile Picture"
              />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Add profile email
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Language
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Playback settings
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Subtitle appearance
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Viewing activity
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
            <div className={`${styles.tile} ${styles.lineBreak} `}>
              Ratings
              <i className={` ${styles.arrowIcon} fas fa-chevron-right`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
