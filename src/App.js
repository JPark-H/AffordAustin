import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
//import * as Icon from 'bootstrap-icons/font/bootstrap-icons.css';
import * as Icon from 'react-bootstrap-icons';
import About from './Components/About/About';
import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react';
import Housing from './Components/Housing/Housing';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home/Home'
import {Job1, Job2, Job3 } from './Components/Jobs/Jobs'

function App() {
  return (
    <div className="App" style = {{backgroundColor:"#282c34"}}>
      <header className="App-header">
      </header>
	  <Router>
		<MainNavBar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Housing" element={<Housing />} />
			{/* <Route path="/ChildCare" element={<ChildCare />} /> */}
			{/*<Route path="/Jobs" element={<Job1 />} /> 8*/}
			<Route path="/About" element={<About />} />
			{/* <Route path="/Search" element={<Search />} /> */}

			<Route path='/Jobs/1' element={<Job1 />} />
			<Route path='/Jobs/2' element={<Job2 />} />
			<Route path='/Jobs/3' element={<Job3 />} />
		</Routes>
	  </Router>
	  {/* <MainNavBar />
	  <About />
	  <HousingPage /> */}
    </div>
  );
}

export default App;
