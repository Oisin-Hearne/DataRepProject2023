import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Read from './components/Read';
import ContentC from './components/ContentC';
import Edit from './components/Edit';
import Create from './components/Create';
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
          <Navbar.Brand href="home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="Read">Read</Nav.Link>
            <Nav.Link href="Create">Create</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="Create" element={<Create />}></Route>
        <Route path="Read" element={<Read />}></Route>
        <Route path="home" element={<ContentC />}></Route>
        <Route path="edit/:id" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
