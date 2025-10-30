import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import AssetDashboard from "./features/assets/pages/AssetDashboard";
import AssetList from "./features/assets/pages/AssetList";
import AssetForm from "./features/assets/pages/AssetForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Main Page Content */}
        <div className="container flex-grow-1 mt-4">
          <Routes>
            {/* Default route shows Asset Dashboard */}
            <Route path="/" element={<AssetDashboard />} />
            <Route path="/assets/dashboard" element={<AssetDashboard />} />
            <Route path="/assets/list" element={<AssetList />} />
            <Route path="/assets/new" element={<AssetForm />} />
            <Route path="/assets/edit/:id" element={<AssetForm />} />
          </Routes>
        </div>

        {/* Optional Footer */}
        <footer className="bg-dark text-light text-center py-3 mt-auto">
          <p className="mb-0">© 2025 Telecom Inventory System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
