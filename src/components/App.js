import React, { useState } from "react";
import AppRouter from "components/Router";
import fabse from "fBase";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>Fwitter &copy;{new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
