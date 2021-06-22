import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/userIcon.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import SearchBar from "./SearchBar";
import useScreenSize from "../../hooks/useScreenSize";
import Utilities from "../../Utilities";

export default function Header(props) {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, login, logout, getProfile } = auth;

  const [showAccountDropDown, setShowAccountDropDown] = useState(false);
  const [showBrowserDropDown, setShowBrowserDropDown] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { media } = useScreenSize();
  const [transparentHeader, setTransparentHeader] = useState(true);
  const { addEvent, removeEvent } = Utilities;
  useEffect(() => {
    const checkScrollHeight = e => {
      window.scrollY > 0
        ? setTransparentHeader(false)
        : setTransparentHeader(true);
    };

    addEvent(window, "scroll", checkScrollHeight);
    return () => removeEvent(window, "scroll", checkScrollHeight);
  });

  useEffect(() => {
    if (isAuthenticated()) {
      getProfile((profile, error) => {
        setProfile(profile);
        setError(error);
      });
    }
  }, []);

  const SideMenu = function() {
    return (
      <>
        {isAuthenticated() && profile ? (
          <>
            {" "}
            <div>
              <div>
                {" "}
                <img
                  className={styles.avatar}
                  src={userIcon}
                  alt="Profile Avatar"
                />
              </div>
              <div>{profile.name}</div>
            </div>
            <div>
              {" "}
              <ul>
                <li>
                  {" "}
                  <Link to="/profile">Account</Link>
                </li>
                <li>Help Centre</li>
                <li onClick={logout}>Sign out of Netflix</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div />
            <div onClick={login}> Sign in</div>
          </>
        )}

        <div>
          <ul>
            <li>
              <b style={{ color: "var(--white)" }}>Home</b>
            </li>
            {isAuthenticated() && profile ? (
              <Link to="/favorites">
                <p>My List</p>
              </Link>
            ) : null}{" "}
            <li>
              {" "}
              <Link to="/movies">
                <p>Movies</p>{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/tvshows">
                <p>TV Shows</p>{" "}
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };
  const SubNav = function() {
    return (
      <>
        <div>
          <Link to="/">
            <h4>Home</h4>
          </Link>
        </div>
        <div>
          <Link to="/tvshows">
            <p>TV Shows</p>{" "}
          </Link>
        </div>
        <div>
          <Link to="/movies">
            <p>Movies</p>{" "}
          </Link>
        </div>
        <div>
          {isAuthenticated() && profile ? (
            <Link to="/favorites">
              <p>My List</p>
            </Link>
          ) : null}
        </div>
      </>
    );
  };
  return (
    <>
      <header
        className={styles.nav}
        style={{
          backgroundColor:
            media === "mobile"
              ? "var(--black)"
              : transparentHeader
              ? "transparent"
              : "var(--black)",
          gridTemplateColumns:
            media === "mobile"
              ? `1fr 3fr 4fr`
              : media === "tablet"
              ? `minmax(50px, 80px) 1fr 1fr 50px 50px`
              : `minmax(70px, 80px) 1fr minmax(290px, 1fr) 50px 50px`,
          padding:
            media === "mobile" ? `0 0` : `0 calc(var(--slideWidth) * 0.12)`
        }}
      >
        {media === "mobile" ? (
          <>
            <div
              className={styles.menuContainer}
              onClick={() => setShowSideMenu(!showSideMenu)}
            >
              <i className="fas fa-bars" />
            </div>
            <div
              id={styles.sideMenu}
              className={`${styles.sideMenu} ${
                showSideMenu ? styles.slideIn : styles.slideOut
              }`}
            >
              <SideMenu />
            </div>
          </>
        ) : null}
        <div className={styles.logoContainer}>
          <Link to="/">
            {" "}
            <img className={styles.img} src={logo} alt="" />
          </Link>
        </div>
        {media !== "mobile" ? (
          <div className={styles.innerNav}>
            {media === "desktop" ? (
              <SubNav />
            ) : (
              <div
                onMouseEnter={() => setShowBrowserDropDown(true)}
                onMouseLeave={() => setShowBrowserDropDown(false)}
              >
                <h4>Browse</h4>
                <i className="fas fa-caret-down" />
                {showBrowserDropDown ? (
                  <>
                    <div className={styles.arrowBrowser}>
                      <i className={`fas fa-caret-up`} />
                    </div>
                    <div className={styles.browserDropdown}>
                      <SubNav />
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        ) : null}

        <SearchBar key={1} {...props} media={media} />

        <>
          {media !== "mobile" ? (
            <>
              <div className={styles.notificationsBtn}>
                <i className="fas fa-bell" />
              </div>
              {isAuthenticated() && profile ? (
                <div
                  className={styles.accountBtn}
                  onMouseEnter={() => setShowAccountDropDown(true)}
                  onMouseLeave={() => setShowAccountDropDown(false)}
                >
                  <img
                    className={styles.avatar}
                    src={userIcon}
                    alt="Profile Avatar"
                  />
                  {showAccountDropDown ? (
                    <>
                      <div className={styles.arrow}>
                        <i className={`fas fa-caret-up`} />
                      </div>
                      <div className={styles.accountDropdown}>
                        <ul>
                          <li>
                            <Link to="/profile">Account</Link>
                          </li>
                          <li>Help Center</li>
                          <li onClick={logout}>Log Out</li>
                        </ul>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : (
                <div className={styles.signIn} onClick={login}>
                  {" "}
                  Sign in
                </div>
              )}
            </>
          ) : null}
        </>
      </header>
    </>
  );
}
