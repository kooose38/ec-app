import React, { Component } from 'react'
import Router from "./Router";
import "./assets/style/style.css";
import "./assets/style/reset.css";
import "./assets/style/theme.js";
import { Header } from "./components/headers";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;