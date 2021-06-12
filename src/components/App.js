import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initalizing..."
      )}
      <footer>Fwitter &copy;{new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
