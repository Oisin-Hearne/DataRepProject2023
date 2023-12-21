import './App.css';
import React from 'react';
import './index.css';
import Dex from './components/Dex';
import ViewTeams from './components/ViewTeams';
import Home from './components/Home';
import Update from './components/Update';
import CreateTeam from './components/CreateTeam';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  NavLink,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="home">Teambuilder</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="ViewTeams">Teams</Nav.Link>
            <Nav.Link href="CreateTeam">Build</Nav.Link>
            <Nav.Link href="Dex">Dex</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="CreateTeam" element={<CreateTeam />}></Route>
        <Route path="ViewTeams" element={<ViewTeams />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="dex" element={<Dex />}></Route>
        <Route path="update/:id" element={<Update />}></Route>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
