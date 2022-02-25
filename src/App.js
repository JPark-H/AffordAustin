import './App.css';
import { Container,Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
//import * as Icon from 'bootstrap-icons/font/bootstrap-icons.css';
import * as Icon from 'react-bootstrap-icons';
import About from './Components/About'
import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App" style = {{backgroundColor:"#282c34"}}>
      <header className="App-header">
      </header>
	  <About />
	  
    </div>
  );
}

export default App;
