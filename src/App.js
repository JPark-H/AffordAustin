import './App.css';
import { Container,Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
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
			{/* <Route path="/Jobs" element={<Jobs />} /> */}
			<Route path="/About" element={<About />} />
			{/* <Route path="/Search" element={<Search />} /> */}
		</Routes>
	  </Router>
	  {/* <MainNavBar />
	  <About />
	  <HousingPage /> */}
    </div>
  );
}

export default App;
