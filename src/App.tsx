import React, { useState, useEffect } from "react";

import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import { Spinner } from "react-bootstrap";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO - is this required now that we have the token refresh link?
    fetch(process.env.REACT_APP_BACKEND + "/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      console.log("data:", accessToken);
      // console.log('Refreshed access token:', accessToken)
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return <Routes />;
};
