# Notflix

Check out the live version here:
https://notflix-app.herokuapp.com/

##### Please note that Heroku servers fall asleep if not in use for 30 mins, so the first load may take up to a minute. However, local (actual) load times are much faster.

Notflix is a netflix clone built from scratch utilizing React, Auth0, NodeJS and MongoDB. The app uses the YouTube API, as well as the theMovieDB API to collect movie trailer data.

The app makes use of various techniques/technologies including:

- Full Authentication using Auth0
- A NoSQL database containing User and Video Data
- A NodeJS server built with Express
- A React frontend built using hooks and the context API
- Responsive design for both mobile and desktop
- Integration with the YouTube Video Data API, YouTube WebPlayer API, and MovieDB API
- CRUD functionality for favoriting videos

## Instructions

Follow the below instructions to run on your local machine.

### Clone Repo

```
git clone https://github.com/jameswilky/notflix
```

### Install NPM packages

```
npm i
```

### Run Server

```
node server
```

### Run Application

```
npm start
```

To use the Youtube and MovieDB api parsers, get a key from their respective websites and add them the the `.env` file. This is not required to run the application
