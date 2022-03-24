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

import Housing from "./Components/Housing/Housing";
import HousingGrid from "./Components/Housing/HousingGrid";

import Job from "./Components/Jobs/Jobs";
import JobGrid from "./Components/Jobs/JobGrid";

import ChildCare from "./Components/ChildCare/ChildCare";
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
          {/* <Route path="/Jobs/:id" element={<Job />} /> */}

          <Route path="/Housing" element={<HousingGrid />} />
          <Route path="/Housing/:id" element={<Housing />}/>

          <Route path="/ChildCare" element={<ChildCareGrid />} />
          <Route path="/ChildCare/:id" element={<ChildCare />} />

          {/* <Route path="/Search" element={<Search />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
