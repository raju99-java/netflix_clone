import React from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import uuid from "uuid";
import styles from "./Grid.module.css";
import Utilities from "../../Utilities";
import useScreenSize from "../../hooks/useScreenSize";

export default function Grid(props) {
  const { videos } = props;
  const { fitSlides } = Utilities;
  const { screenWidth, media } = useScreenSize();
  const minimum = media === "mobile" ? screenWidth / 3 : 200;
  const { videosByColumn, slideWidth } = fitSlides(
    screenWidth,
    minimum,
    videos.length,
    videos
  );

  return videosByColumn.map(column => {
    return (
      <div className={styles.column} key={uuid()}>
        {column.map((video, i, self) => {
          return (
            <VideoPlayer
              type={"slide"}
              video={video}
              key={uuid()}
              {...props}
              position={
                i === 0 ? "first" : i < self.length - 1 ? "middle" : "last"
              }
              width={slideWidth}
            />
          );
        })}
      </div>
    );
  });
}
