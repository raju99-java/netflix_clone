import React, { useContext, useState, useEffect } from "react";
import styles from "./Browser.module.css";
import Carousel from "../Carousel/Carousel";
import uuid from "uuid";
import Loading from "../Loading/Loading";
import useVideos from "../../hooks/useVideos";
import pageNames from "../../pageNames";
import useScreenSize from "../../hooks/useScreenSize";
import Grid from "../Grid/Grid";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { UserContext } from "../../contexts/UserContext";

export default function Browser(props) {
  const { FAVORITES, SEARCH } = pageNames;

  const { includeBanner, videoType = false, content } = props;

  const query = props.history.location.search;

  const { videosLoaded, videosByGenre, searchedVideos } = useVideos(
    content,
    query,
    props.location
  );

  const { userLoaded, user } = useContext(UserContext);
  const [autoplay, setAutoplay] = useState(true);
  const [isFirstMount, setIsFirstMount] = useState(false);

  const { screenWidth, screenHeight, media } = useScreenSize();

  useEffect(() => {
    setIsFirstMount(true);
  }, []);

  const CarouselBody = () => {
    return videosByGenre.map(items => {
      const genre = Object.keys(items)[0];
      let videos = Object.values(items)[0];
      //if type specified
      if (videoType) {
        // Only include videos of specified type
        videos = items[genre].filter(video => {
          return video.type === videoType;
        });
      }
      if (videos.length > 5) {
        return (
          <Carousel
            genre={genre}
            videos={videos}
            key={uuid()}
            {...props}
            screenWidth={screenWidth}
            media={media}
          />
        );
      } else return null;
    });
  };

  const Favorites = () => {
    return (
      <>
        {userLoaded ? (
          <div className={styles.gridContainer}>
            <div className={styles.title}>
              <h2>My List</h2>
            </div>
            {user.favorites.length > 0 ? (
              <div className={styles.gridBody}>
                <Grid
                  videos={user.favorites}
                  key={uuid()}
                  {...props}
                  screenWidth={screenWidth}
                />
              </div>
            ) : (
              <div className={styles.noItems}>
                You haven't added any titles to your list yet.
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  };

  const SearchResults = () => {
    return (
      <>
        {videosLoaded ? (
          <>
            {searchedVideos.length > 0 ? (
              <>
                <div className={styles.gridContainer}>
                  <div className={styles.title}>
                    <h3>{`Results for ${query.slice(3)}`}</h3>
                  </div>
                  <div className={styles.gridBody}>
                    <Grid
                      videos={searchedVideos}
                      key={uuid()}
                      {...props}
                      screenWidth={screenWidth}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.notFound}>
                Your Search for "{query.slice(3)}" did not have any matches.
                Suggestions:
                <ul>
                  <li>Try different keywords</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>
                    Try using a movie, TV show title, an actor or director
                  </li>
                  <li> Try a genre like comedy, romance, sports or drama</li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  };
  const Body = () => {
    switch (content) {
      case FAVORITES:
        return Favorites();
      case SEARCH:
        return SearchResults();
      default:
        return CarouselBody();
    }
  };
  return (
    <div className={styles.main}>
      {videosLoaded ? (
        <>
          {includeBanner ? (
            <VideoPlayer
              position="middle"
              video={Object.values(videosByGenre[0])[0][1]}
              width={screenWidth}
              style={{
                width: `100%`,
                maxHeight: `calc(${screenHeight}px)`,
                zIndex: 0,
                height: `calc(${screenWidth}px * 0.5625)`,
                marginBottom:
                  media === "mobile"
                    ? "0px"
                    : screenWidth * 0.5625 > screenHeight
                    ? `-32px`
                    : `calc(100vh * -0.1)`,
                border: 0,
                backgroundColor: `rgba(0,0,0,0)`
              }}
              autoplay={autoplay && !isFirstMount}
            />
          ) : null}

          <div onMouseOver={() => isFirstMount && setAutoplay(false)}>
            {" "}
            <Body />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
