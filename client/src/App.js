import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header/Header.js";
import HomePage from "./pages/Home/HomePage.js";

import GamesMenu from "./pages/Games/Menu/GamesPage.js";
import GamePlay from "./pages/Games/Play/GamePlay.js";
import ExistingUserProvider from "./utils/existingUserContext";

// import Settings from "./components/Settings/Settings";

import GameContextProvider from "./utils/gameContext";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
    <>
      <Router>
        <ApolloProvider client={client}>
          <ExistingUserProvider>
            <GameContextProvider>
              <Header />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<GamesMenu />} />
                <Route path="/gameplay" element={<GamePlay />}></Route>
              </Routes>
            </GameContextProvider>
          </ExistingUserProvider>
        </ApolloProvider>
      </Router>
    </>
  );
}

export default App;
