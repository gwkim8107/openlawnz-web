import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Auth0Provider } from "../js/react-auth0-spa";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    client_id={process.env.AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}>
    <App />
    </Auth0Provider>,
    document.getElementById("root")
);
