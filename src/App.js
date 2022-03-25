import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import About from "./Components/Pages/About/About";
import MainNavBar from "./Components/MainNavBar/MainNavBar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import GridPage from "./Components/Pages/Grid/GridPage";
import InstancePage from "./Components/Pages/Instance/InstancePage";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="/Jobs" element={<GridPage model="Jobs" />} />
          <Route path="/Jobs/:id" element={<InstancePage model="Jobs"/>} />

          <Route path="/Housing" element={<GridPage model="Housing" />} />
          <Route path="/Housing/:id" element={<InstancePage model="Housing"/>}/>

          <Route path="/ChildCare" element={<GridPage model="Childcare" />} />
          <Route path="/ChildCare/:id" element={<InstancePage model="Childcare"/>} />
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* <Route path="/Search" element={<Search />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
