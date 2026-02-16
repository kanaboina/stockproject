import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <Auth0Provider
    domain="dev-3n4lqhyiffc85k6a.us.auth0.com"
    clientId="PT2cVFumJIBeDIpS4LvbOuTCgkart96I"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinPage} />
        </div>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
