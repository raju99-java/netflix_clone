export default (function() {
  const sortBy = (videos, field) => {
    //sorts a list of objects by field in alphabetical order
    return videos.sort((a, b) => {
      const A = a[field].toUpperCase();
      const B = b[field].toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  };

  const groupBy = (videos, genres) => {
    // This funcion returns a list of objects that map each genre to all vidoes of that genre
    // The genre of each video is considered to be the first item from the genres array
    return genres.map(genre => {
      //genres[0] will select first genre from list of genres
      return { [genre]: videos.filter(video => video.genres[0] === genre) };
    });
  };

  const addEvent = function(object, type, callback) {
    if (object == null || typeof object == "undefined") return;
    if (object.addEventListener) {
      object.addEventListener(type, callback, false);
    } else {
      object["on" + type] = callback;
    }
  };
  const removeEvent = function(object, type, callback) {
    if (object == null || typeof object == "undefined") return;
    if (object.removeEventListener) {
      object.removeEventListener(type, callback, false);
    } else {
      object["on" + type] = callback;
    }
  };

  const fitSlides = (screenWidth, min, n, videos) => {
    const padding = 30;
    const scrollBarWidth = 17;
    const nSlides = n;
    const containerWidth = screenWidth - (scrollBarWidth + padding * 2);
    const minWidth = min;
    const nVisibleSlides = Math.floor(containerWidth / minWidth) || 1;
    const slideWidth = Math.floor(containerWidth / nVisibleSlides);
    const colSize = slideWidth * nVisibleSlides;
    const nCols =
      (nSlides % nVisibleSlides) + Math.floor(nSlides / nVisibleSlides);

    const getTemplate = () => `${colSize}px `.repeat(nCols);

    const videosByColumn = videos
      .map(function(e, i) {
        return i % nVisibleSlides === 0
          ? videos.slice(i, i + nVisibleSlides)
          : null;
      })
      .filter(function(e) {
        return e;
      });

    /* imperative operation, set CSS width*/
    document.documentElement.style.setProperty(
      "--slideWidth",
      `${slideWidth}px`
    );

    return {
      getTemplate,
      videosByColumn,
      slideWidth,
      containerWidth,
      nCols,
      colSize
    };
  };

  return { sortBy, groupBy, addEvent, removeEvent, groupBy, fitSlides };
})();
