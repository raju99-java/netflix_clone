import React from "react";
import styles from './Browser.module.css'

export default function SearchResults(props) {
  const {videos,screenWidth}
  return (
    <>
      {videosLoaded ? (
        <>
          {videos.length > 0 ? (
            <>
              <div className={styles.gridContainer}>
                <div className={styles.title}>
                  <h3>{`Results for ${query.slice(3)}`}</h3>
                </div>
                <div className={styles.gridBody}>
                  <Grid
                    videos={videos}
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
                <li>Try using a movie, TV show title, an actor or director</li>
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
}
