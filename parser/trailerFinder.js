const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

/* This module will search movieDB API for a list of movies and tv shows, and then output them in to the input folder*/
const createArray = (min, max) => {
  let output = [];

  for (let i = min + 1; i < max + 1; i++) {
    output.push(i);
  }
  return output;
};
const showURL = n =>
  `https://api.themoviedb.org/3/discover/tv?api_key=${
    process.env.MOVIE_DB_API_KEY
  }&language=en-US&sort_by=popularity.desc&page=${n}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=en`;

const movieURL = n =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${
    process.env.MOVIE_DB_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}&with_original_language=en`;

const getData = (url, dest, start, limit) => {
  const output = createArray(start, limit);
  Promise.all(output.map(i => fetch(url(i)))).then(responses => {
    Promise.all(responses.map(res => res.json())).then(data =>
      fs.writeFileSync(dest, JSON.stringify(data), "utf-8", () => {
        console.log("done");
      })
    );
  });
};

// for (let i = 0; i < 25; i++) {
//   const interval = i * 12000;
//   setTimeout(() => {
//     getData(showURL, `./input/shows/tvShow${i}.json`, i * 40, i * 40 + 40);
//   }, interval);
// }

for (let i = 0; i < 25; i++) {
  const interval = i * 12000;
  setTimeout(() => {
    getData(movieURL, `./input/movies/movies${i}.json`, i * 40, i * 40 + 40);
  }, interval);
}
