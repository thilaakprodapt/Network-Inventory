import React from "react";

const DashboardCard = ({ title, value, color }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className={`card text-white bg-${color} shadow-sm`}>
        <div className="card-body text-center">
          <h5>{title}</h5>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
