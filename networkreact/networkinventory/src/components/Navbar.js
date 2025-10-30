// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function CustomNavbar() {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Telecom Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/assets/dashboard" active={location.pathname.includes("dashboard")}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/assets/list" active={location.pathname.includes("list")}>Assets</Nav.Link>
            <Nav.Link as={Link} to="/assets/new" active={location.pathname.includes("new")}>Add Asset</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
