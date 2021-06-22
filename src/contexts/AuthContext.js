import React, { useState } from "react";
const AuthContext = new React.createContext(); // takes in an object and a function
const AuthProvider = props => {
  return (
    <AuthContext.Provider value={props}>{props.children}</AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };

// reference
// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react/
