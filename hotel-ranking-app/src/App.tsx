import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "./store";

import { actions } from "./state/reducers";

function App() {
  const { hotels } = useSelector(({ app: { hotels } }: RootState) => ({
    hotels,
  }));

  console.log("hotels", hotels);

  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("handleClick");
    dispatch(actions.click("coords"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>Click</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
