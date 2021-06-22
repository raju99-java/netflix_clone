import { useState, useEffect } from "react";
import Utilities from "../Utilities";
import genres from "../genres";
import pageNames from "../pageNames";

export default function useVideos(content, query, location) {
  const { SEARCH, FAVORITES } = pageNames;
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videosByGenre, setVideosByGenre] = useState({});
  const [searchedVideos, setSearchedVideos] = useState([]);
  const { groupBy, addEvent, removeEvent } = Utilities;

  useEffect(() => {
    /* Load videos by genre for default browser*/
    if (content !== SEARCH) {
      const abortController = new AbortController();
      const signal = abortController.signal;
      setVideosLoaded(false);
      fetch("/videos", { signal: signal })
        .then(response => {
          if (response.ok) return response.json();
          throw new Error("Network respones was not ok.");
        })
        .then(response => {
          setVideosByGenre(groupBy(response, genres));
          setVideosLoaded(true);
        })
        .catch(error => {});

      return () => {
        abortController.abort();
      };
    }
  }, []);

  useEffect(() => {
    /* Load queried videos, with a slight delay after last key press to batch queries to server*/
    console.log(videosLoaded);
    if (content === SEARCH) {
      const abortController = new AbortController();
      const signal = abortController.signal;
      let typingTimer;
      const startCountdown = () => {
        /* submit search 300ms after finished typing*/
        clearTimeout(typingTimer);
        typingTimer = setTimeout(submitSearch, 300);
      };
      const clearTimer = () => {
        clearTimeout(typingTimer);
      };

      const submitSearch = () => {
        fetch(`/search${query}`, { signal: signal })
          .then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then(videos => {
            console.log(videos);

            videos !== []
              ? setSearchedVideos(videos)
              : setSearchedVideos(false);
            setVideosLoaded(true);
          });
      };

      if (!location.prevPath) submitSearch();
      else {
        addEvent(window, "keyup", startCountdown);
        addEvent(window, "keydown", clearTimer);
      }

      return () => {
        removeEvent(window, "keyup", startCountdown);
        removeEvent(window, "keydown", clearTimer);
        abortController.abort();
      };
    }
  }, [query]);

  return { videosLoaded, videosByGenre, searchedVideos };
}
