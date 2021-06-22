import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import styles from "./SearchBar.module.css";
import { withRouter } from "react-router-dom";
import { HistoryContext } from "../../contexts/HistoryContext";

function SearchBar(props) {
  const { isFirstLoad } = useContext(HistoryContext);
  const query = queryString.parse(props.location.search).q;
  const route = props.history.location.pathname;
  const { media } = props;

  const getShowCondition = () => {
    const querying = query !== undefined;
    const atHome = route === "/";
    let show = false;

    if (querying || (atHome && !isFirstLoad)) {
      show = true;
    }

    return show;
  };
  const [show, setShow] = useState(
    getShowCondition()
    // query !== undefined && route !== "/" && prev !== undefined ? true : false
  );
  const [value, setValue] = useState(query === undefined ? "" : query);

  /* On Click outside*/
  useEffect(() => {
    const clickedAway = e => {
      if (show && e.target.id !== "search") {
        setShow(!show);
      }
    };
    document.addEventListener("click", clickedAway);

    return () => document.removeEventListener("click", clickedAway);
  }, [show]);

  /* On value change */
  const handleValueChange = e => {
    // Keep textbox o

    /* If search box is empty, reroute to home*/
    if (e.target.value === "") {
      props.history.push({
        pathname: "/"
      });
    } /* otherwise, route to search and query the value*/ else {
      props.history.push({
        pathname: "/search",
        search: `?q=${e.target.value}`,
        prevPath: route
      });
    }
    setValue(e.target.value);
  };
  return (
    <>
      {media === "mobile" ? (
        <div className={styles.mobileContainer}>
          <input
            className={styles.input}
            value={value}
            onChange={e => {
              handleValueChange(e);
            }}
            id={"search"}
            onClick={e => e.stopPropagation()}
            type="text"
            placeholder="Search"
            autoFocus
          />
        </div>
      ) : (
        <div
          className={`${styles.container} ${show ? styles.show : ""}`}
          onClick={() => setShow(!show)}
        >
          <i
            className={`fas fa-search ${styles.searchBtn}`}
            onClick={() => {}}
          />
          {show ? (
            <input
              className={styles.input}
              value={value}
              onChange={e => {
                handleValueChange(e);
              }}
              id={"search"}
              onClick={e => e.stopPropagation()}
              type="text"
              placeholder="Titles, people, genres"
              autoFocus
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default withRouter(SearchBar);
