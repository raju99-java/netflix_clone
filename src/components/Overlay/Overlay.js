import React, { useState, useContext, useEffect } from "react";
import slideStyles from "./SlideOverlay.module.css";
import bannerStyles from "./BannerOverlay.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { AudioContext } from "../../contexts/AudioContext";
import useScreenSize from "../../hooks/useScreenSize";

import uuid from "uuid";
import useVideoState from "../../hooks/useVideoState";

export default function Overlay(props) {
  const { id, player, metaData, type, playerLoading, fullScreen } = props;
  const { title, match, maturity, length, categories, overview } = metaData;
  const { auth } = useContext(AuthContext);
  const { updateUser, user, userLoaded } = useContext(UserContext);

  const { muteAll, setMuteAll } = useContext(AudioContext);
  const [videoState, setVideoState] = useVideoState(muteAll);
  const { media } = useScreenSize();
  const { isLiked, isDisliked, isFavorited } = videoState;

  useEffect(() => {
    if (userLoaded) {
      setVideoState({
        muteAll: muteAll,
        isLiked: user.likes.filter(video => video._id === id).length > 0,
        isDisliked: user.dislikes.filter(video => video._id === id).length > 0,
        isFavorited: user.favorites.filter(video => video._id === id).length > 0
      });
    }
  }, userLoaded);

  const like = () => {
    updateUser({ type: "LIKE", payload: !isLiked }, auth, id);
    setVideoState({
      ...videoState,
      isLiked: !isLiked,
      isDisliked: false
    });
  };
  const dislike = () => {
    updateUser({ type: "DISLIKE", payload: !isDisliked }, auth, id);

    setVideoState({
      ...videoState,
      isDisliked: !isDisliked,
      isLiked: false
    });
  };
  const favorite = () => {
    updateUser({ type: "FAVORITE", payload: !isFavorited }, auth, id);
    setVideoState({
      ...videoState,
      isFavorited: !isFavorited
    });
  };
  const mute = () => {
    playerLoading.then(() => {
      if (player.isMuted()) {
        player.unMute();
        setMuteAll(false);
      } else {
        player.mute();
        setMuteAll(true);
      }
    });
  };
  const BannerOverlay = () => {
    const styles = bannerStyles;
    return (
      <>
        {media === "mobile" ? (
          <div className={`${styles.body} ${styles.mobileContainer}`}>
            <div className={styles.mobileTitle}>
              <h1>{title}</h1>
            </div>
            <div className={styles.mobileInfo}>
              2019 {maturity} {length}
            </div>
            <div className={styles.mobilePlay}>
              <div className={styles.mobileButton} onClick={() => fullScreen()}>
                <h3>
                  <b>PLAY</b>
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.body}>
            <div className={styles.text}>
              <div className={styles.title}>
                <h1>{title}</h1>
              </div>
              <div className={styles.btnContainer}>
                <div
                  onClick={() => {
                    fullScreen();
                  }}
                >
                  <i className="fas fa-play" />
                  Play
                </div>
                <div onClick={() => favorite()}>
                  <i className="fas fa-plus" />
                  My List
                </div>
                {/* <div>
              <i className="fas fa-info-circle" />
              More Info
            </div> */}
              </div>
              <div className={styles.description}>{overview}</div>
              <div className={styles.rightFloat}>
                <div className={styles.mute} onClick={() => mute()}>
                  {" "}
                  <i className="fas fa-volume-mute" />
                </div>
                <div className={styles.rating}>{maturity}</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const SlideOverlay = () => {
    const styles = slideStyles;
    return media === "mobile" ? (
      <div />
    ) : (
      <>
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.play}>
              <i
                className={`fas fa-play ${styles.playBtn} ${styles.btn}`}
                onClick={() => {
                  fullScreen();
                }}
              />
            </div>
            <div>
              <h3>{title}</h3>
            </div>
            <div className={styles.text}>
              <div className={styles.match}>{match}</div>
              <div className={styles.maturity}>{maturity}</div>
              <div>{length}</div>
            </div>
            <div className={styles.text}>
              <div>{categories[0]}</div>

              {categories.length > 1
                ? categories.map((category, i) => {
                    if (i > 1)
                      return (
                        <div key={uuid()}>
                          <span className={styles.dot}>&middot;</span>{" "}
                          {category}
                        </div>
                      );
                  })
                : null}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.btnContainer}>
              <div
                className={`${styles.btn} ${muteAll ? styles.btnSelected : ""}`}
              >
                <i className="fas fa-volume-mute" onClick={() => mute()} />{" "}
              </div>
              {auth.isAuthenticated() ? (
                <>
                  <div
                    className={`${styles.btn} ${
                      isLiked ? styles.btnSelected : ""
                    }`}
                  >
                    <i className="far fa-thumbs-up" onClick={() => like()} />
                  </div>
                  <div
                    className={`${styles.btn} ${
                      isDisliked ? styles.btnSelected : ""
                    }`}
                  >
                    <i
                      className="far fa-thumbs-down"
                      onClick={() => dislike()}
                    />
                  </div>
                  <div
                    className={`${styles.btn} ${
                      isFavorited ? styles.btnSelected : ""
                    }`}
                  >
                    <i className="fas fa-plus" onClick={() => favorite()} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  };
  return <>{type === "slide" ? <SlideOverlay /> : <BannerOverlay />}</>;
}
