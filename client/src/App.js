import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Header from "./components/Header/Header.js";
import HomePage from "./pages/Home/HomePage.js";
<<<<<<< HEAD
import GamePage from "./pages/Home/GamePage.js";

=======
import GamesPage from "./pages/Games/GamesPage.js";
import ExistingUserProvider from "./utils/existingUserContext";
>>>>>>> main

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
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3002`);
    console.log(newSocket,"Made?");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ExistingUserProvider>
                <HomePage />
              </ExistingUserProvider>
            }
          />
          <Route path="/games" element={<GamesPage />} />
          {/* <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <CreateAccount />
          </div>
        </div> */}
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
