import React, { useState, useContext } from "react";
import Youtube from "react-youtube";
import styles from "./Video.module.css";
import { AudioContext } from "../../contexts/AudioContext";

export default function Video(props) {
  const { id, setPlayer, load, width, autoplay } = props;
  const [loaded, setLoaded] = useState(false);
  const height = width * 0.5625;
  const { muteAll } = useContext(AudioContext);

  const options = {
    height: height,
    width: width,
    playerVars: {
      allowFullScreen: 1,
      controls: 0,
      frameBorder: 0,
      autoplay: autoplay ? 1 : 0,
      mute: muteAll ? 1 : 0
    }
  };

  const onReadyHandler = e => {
    setPlayer(e.target);
    setLoaded(true);
  };

  return (
    <>
      {load || autoplay ? (
        <Youtube
          className={styles.test}
          videoId={id}
          opts={options}
          onReady={e => onReadyHandler(e)}
          className={styles.body}
        />
      ) : null}
    </>
  );
}
