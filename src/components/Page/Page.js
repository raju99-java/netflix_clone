import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Browser from "../Browser/Browser";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import pageNames from "../../pageNames";
import Utilities from "../../Utilities";

export default function Page(props) {
  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVORITES, SEARCH } = pageNames;
  const { content } = props;
  const { addEvent, removeEvent } = Utilities;

  //Transparent header if the page is home, tv shows or movies
  const isTransparent =
    content === HOME || content === TV_SHOWS || content === MOVIES;

  const Body = () => {
    switch (content) {
      case HOME:
        return <Browser {...props} includeBanner={true} />;
      case SEARCH:
        return <Browser {...props} includeBanner={false} />;
      case TV_SHOWS:
        return <Browser {...props} includeBanner={true} videoType={"show"} />;
      case MOVIES:
        return <Browser {...props} includeBanner={true} videoType={"movie"} />;
      case PROFILE:
        return <Profile {...props} />;
      case FAVORITES:
        return <Browser {...props} includeBanner={false} />;
      default:
        return <Browser {...props} />;
    }
  };
  return (
    <>
      {" "}
      <Header {...props} isTransparent={isTransparent} />
      <Body />
      <Footer />
    </>
  );
}
