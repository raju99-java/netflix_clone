import React, { useState } from "react";
const AudioContext = new React.createContext(); // takes in an object and a function
const AudioProvider = props => {
  const [muteAll, setMuteAll] = useState(false);
  const state = { muteAll, setMuteAll };
  return (
    <AudioContext.Provider value={state}>
      {props.children}
    </AudioContext.Provider>
  );
};
export { AudioContext, AudioProvider };
