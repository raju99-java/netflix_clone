import React, { useState, useEffect } from "react";
const HistoryContext = new React.createContext(); // takes in an object and a function
const HistoryProvider = props => {
  const { history, firstLoad } = props;
  const [isFirstLoad, setIsFirstLoad] = useState(firstLoad);
  useEffect(() => {
    if (history.location.prevPath) {
      setIsFirstLoad(false);
    }
  }, [history.location]);

  const state = { isFirstLoad };
  return (
    <HistoryContext.Provider value={state}>
      {props.children}
    </HistoryContext.Provider>
  );
};
export { HistoryContext, HistoryProvider };
