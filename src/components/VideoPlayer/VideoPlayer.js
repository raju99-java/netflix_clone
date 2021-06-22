import React, { useState, useEffect } from "react";
import Video from "../Video/Video";
import styles from "./VideoPlayer.module.css";
import Overlay from "../Overlay/Overlay";
import useScreenSize from "../../hooks/useScreenSize";

export default function VideoPlayer(props) {
  const { video, position, width, style = {}, type, autoplay = false } = props;
  const { videoId } = video;
  const [player, setPlayer] = useState();
  const [showThumbnail, setShowThumbnail] = useState(!autoplay);
  const [loadPlayer, setLoadPlayer] = useState(false);

  const { media } = useScreenSize();

  const playerLoading = new Promise(resolve => {
    if (player !== undefined) resolve(player);
  });
  const [metaData] = useState({
    title: video.title,
    match: `${video.vote_average * 10}% Match`, // use user score
    maturity: "M",
    length: "4 Seasons",
    categories: video.genres,
    overview: video.overview
  });

  const thumbnailRef = React.useRef();
  const fullScreen = () => {
    playerLoading.then(player => {
      try {
        player.playVideo();

        let iframe = player.a;
        let requestFullScreen =
          iframe.requestFullScreen ||
          iframe.mozRequestFullScreen ||
          iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
          requestFullScreen.bind(iframe)();
        }
      } catch {}
    });
  };
  useEffect(() => {
    if (showThumbnail) {
      thumbnailRef.current.style.opacity = "1";
      thumbnailRef.current.style.visibility = "visible";
    } else {
      thumbnailRef.current.style.opacity = "0";
      thumbnailRef.current.style.visibility = "hidden";
    }
  });

  const Thumbnail = () => {
    return (
      <img
        ref={thumbnailRef}
        className={`
        ${styles.thumbnail}
        `}
        data-video={videoId}
        alt="Play this video"
        src={
          type === "slide"
            ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
            : `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`
        }
      />
    );
  };

  return (
    <div
      style={style}
      position={position}
      className={styles.body}
      onClick={e => {
        /* allows user to start video once loaded*/

        if (media !== "mobile") {
          playerLoading.then(player => {
            try {
              player.playVideo();
            } catch {}
          });
        }
      }}
      onTouchStart={e => fullScreen()}
      onMouseEnter={e => {
        /* Will push items to left further when hovering on last item*/
        if (position === "last") {
          document.documentElement.style.setProperty(
            "--slideTranslateMult",
            `-1`
          );
        }
      }}
      onMouseOver={e => {
        /* After re-render, if mouse is hovering over the video once the player is loaded, it will play*/
        setLoadPlayer(true);

        playerLoading
          .then(player => {
            player.playVideo();
            setShowThumbnail(false);
          })
          .catch(() => {
            console.log("not ready");
          });
      }}
      onMouseLeave={e => {
        /* If player is loaded, then pause when leaving slide and show thumbnail */
        playerLoading.then(player => {
          player.pauseVideo();
          setShowThumbnail(true);
        });

        document.documentElement.style.setProperty(
          "--slideTranslateMult",
          `-2`
        );
      }}
    >
      <Video
        id={videoId}
        setPlayer={setPlayer}
        load={loadPlayer}
        autoplay={autoplay}
        width={width}
      />
      {type === "slide" ? (
        <>
          <Overlay
            type={type}
            id={video._id}
            player={player}
            playerLoading={playerLoading}
            metaData={metaData}
            fullScreen={fullScreen}
          />
          <Thumbnail />
        </>
      ) : (
        <>
          {" "}
          <Thumbnail />
          <Overlay
            type={type}
            id={video._id}
            player={player}
            playerLoading={playerLoading}
            metaData={metaData}
            fullScreen={fullScreen}
          />
        </>
      )}
    </div>
  );
}
