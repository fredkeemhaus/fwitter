import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initalizing..."}
      <footer>Fwitter &copy;{new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
