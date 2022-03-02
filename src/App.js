import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
//import * as Icon from 'bootstrap-icons/font/bootstrap-icons.css';
import * as Icon from "react-bootstrap-icons";
import About from "./Components/About/About";
import { IconRotate_90DegreesCcw } from "@aws-amplify/ui-react";
import MainNavBar from "./Components/MainNavBar/MainNavBar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";

import { Housing1, Housing2, Housing3 } from "./Components/Housing/Housing";
import HousingGrid from "./Components/Housing/HousingGrid";

import { Job1, Job2, Job3 } from "./Components/Jobs/Jobs";
import JobGrid from "./Components/Jobs/JobGrid";

import {
  ChildCare1,
  ChildCare2,
  ChildCare3,
} from "./Components/ChildCare/ChildCare";
import ChildCareGrid from "./Components/ChildCare/ChildCareGrid";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="/Jobs" element={<JobGrid />} />
          <Route path="/Jobs/1" element={<Job1 />} />
          <Route path="/Jobs/2" element={<Job2 />} />
          <Route path="/Jobs/3" element={<Job3 />} />

          <Route path="/Housing" element={<HousingGrid />} />
          <Route path="/Housing/1" element={<Housing1 />} />
          <Route path="/Housing/2" element={<Housing2 />} />
          <Route path="/Housing/3" element={<Housing3 />} />

          <Route path="/ChildCare" element={<ChildCareGrid />} />
          <Route path="/ChildCare/1" element={<ChildCare1 />} />
          <Route path="/ChildCare/2" element={<ChildCare2 />} />
          <Route path="/ChildCare/3" element={<ChildCare3 />} />
          {/* <Route path="/Search" element={<Search />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
