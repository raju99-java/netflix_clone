import React, { useEffect, useState, useRef } from "react";
import styles from "./Carousel.module.css";

import ReactDOM from "react-dom";
import Grid from "../Grid/Grid";
import Utilities from "../../Utilities";
export default function Carousel(props) {
  const { videos, genre, screenWidth, media } = props;
  const { fitSlides } = Utilities;
  const minimum = media === "mobile" ? screenWidth / 3 : 200;

  const { getTemplate, containerWidth, nCols, colSize } = fitSlides(
    screenWidth,
    minimum,
    videos.length,
    videos
  );

  const containerRef = React.createRef();

  const [snapPosition, setSnapPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [sliderAtStart, setSliderAtStart] = useState(true);
  const [sliderAtEnd, setSliderAtEnd] = useState(false);
  const bodyRef = useRef(null);

  let scrollTimer = null;
  const handleScroll = element => {
    if (element.scrollLeft > 0) {
      const nextSnap = Math.round(element.scrollLeft / colSize);
      scroll(element, colSize * nextSnap);
      setSnapPosition(nextSnap);
    }
  };
  useEffect(() => {
    if (media !== "mobile") {
      ReactDOM.findDOMNode(bodyRef.current).addEventListener("scroll", function(
        e
      ) {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        e.preventDefault();
        scrollTimer = setTimeout(() => handleScroll(this), 100);
      });
      return () =>
        ReactDOM.findDOMNode(bodyRef.current).removeEventListener(
          "scroll",
          handleScroll
        );
    }
  }, [media]);

  useEffect(() => {
    snapPosition === 0 ? setSliderAtStart(true) : setSliderAtStart(false);
    snapPosition >= nCols - 1 ? setSliderAtEnd(true) : setSliderAtEnd(false);
  }, [snapPosition]);

  const scroll = (element, x) => {
    element.scrollTo({
      left: x,
      behavior: "smooth"
    });
  };

  const slide = (element, n) => {
    if (snapPosition + n >= nCols) {
      return;
    } else if (snapPosition + n > 0) {
      scroll(element, containerWidth * (snapPosition + n));
      setSnapPosition(snapPosition + n);
    } else {
      scroll(element, 0);
      setSnapPosition(0);
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseEnter={() => {
        setShowButtons(true);
      }}
      onMouseLeave={() => setShowButtons(false)}
    >
      <div className={styles.header}>
        <h4>{genre}</h4>
      </div>

      <div
        className={styles.body}
        ref={bodyRef}
        style={{ gridTemplateColumns: getTemplate() }}
      >
        <Grid videos={videos} screenWidth={screenWidth} />
      </div>

      {media === "mobile" ? null : (
        <>
          {" "}
          <div
            className={`${styles.btn} ${styles.left} ${
              showButtons && !sliderAtStart ? styles.show : styles.hidden
            }`}
            onClick={() => bodyRef.current && slide(bodyRef.current, -1)}
          >
            <i className="fas fa-chevron-left" />
          </div>
          <div
            className={`${styles.btn} ${styles.right} ${
              showButtons && !sliderAtEnd ? styles.show : styles.hidden
            }`}
            onClick={() => bodyRef.current && slide(bodyRef.current, 1)}
          >
            <i className="fas fa-chevron-right" />
          </div>
        </>
      )}
    </div>
  );
}
