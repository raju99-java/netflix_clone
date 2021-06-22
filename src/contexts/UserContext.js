import React, { useState, useEffect } from "react";
const UserContext = new React.createContext(); // takes in an object and a function

const UserProvider = props => {
  const { auth } = props;
  const [profile, setProfile] = useState(null); /*hacky */

  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated()) {
      auth.getProfile((profile, error) => {
        setProfile(profile);
      });
    }
  }, []);

  const updateUser = (action, auth, id) => {
    /* users/update*/
    if (profile && auth.isAuthenticated()) {
      fetch("users/update", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            id: profile.sub
          },
          video: {
            id: id
          },
          /* use parameters instead*/
          action: action
        })
      });
    }
  };

  useEffect(() => {
    // setUserLoaded(false);

    const abortController = new AbortController();
    const signal = abortController.signal;
    if (auth.isAuthenticated() && profile) {
      const userId = profile.sub;
      fetch(`/user/${userId}`, { signal: signal })
        .then(response => {
          if (response.ok) return response.json();
          throw new Error("Network respones was not ok.");
        })
        .then(user => {
          setUser(user);
          setUserLoaded(true);
        })
        .catch(error => {});
    }

    return () => {
      abortController.abort();
    };
  }, [profile]);

  const state = { userLoaded, user, updateUser };

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
export { UserContext, UserProvider };
