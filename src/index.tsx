import React, { useState } from "react";
import ReactDOM from "react-dom";
import MapChart from "./map/MapChart";
import './index.css';

function App() {
  return (
    <div>
      <MapChart />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
