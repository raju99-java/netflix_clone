import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Callback(props) {
  const { hash } = props.location;
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (/access_token|id_token|error/.test(hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }, [hash]);

  return (
    <div>
      <h1>Loading...</h1>;
    </div>
  );
}
