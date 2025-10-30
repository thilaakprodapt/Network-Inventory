import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import { FaNetworkWired, FaMapMarkerAlt, FaUserTie, FaExclamationTriangle } from "react-icons/fa";
import "../../../styles/main.css";

const AssetDashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    assigned: 0,
    available: 0,
    faulty: 0,
    retired: 0,
  });

  useEffect(() => {
    axiosInstance.get("/assets").then((res) => {
      const data = res.data;
      setStats({
        totalAssets: data.length,
        assigned: data.filter((a) => a.status === "Assigned").length,
        available: data.filter((a) => a.status === "Available").length,
        faulty: data.filter((a) => a.status === "Faulty").length,
        retired: data.filter((a) => a.status === "Retired").length,
      });
    });
  }, []);

  const cards = [
    {
      title: "Total Assets",
      value: stats.totalAssets,
      icon: <FaNetworkWired className="dashboard-icon text-primary" />,
      color: "var(--light-blue)",
    },
    {
      title: "Available",
      value: stats.available,
      icon: <FaMapMarkerAlt className="dashboard-icon text-success" />,
      color: "var(--light-green)",
    },
    {
      title: "Assigned",
      value: stats.assigned,
      icon: <FaUserTie className="dashboard-icon text-warning" />,
      color: "var(--light-yellow)",
    },
    {
      title: "Faulty",
      value: stats.faulty,
      icon: <FaExclamationTriangle className="dashboard-icon text-danger" />,
      color: "var(--light-red)",
    },
  ];

  return (
    <div className="dashboard-container container py-5">
      <h2 className="fw-bold mb-4">📊 Asset Management Dashboard</h2>
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="dashboard-card p-4 text-center shadow-sm" style={{ background: card.color }}>
              <div className="mb-3">{card.icon}</div>
              <h4 className="fw-semibold">{card.title}</h4>
              <h2 className="fw-bold mt-2">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetDashboard;
