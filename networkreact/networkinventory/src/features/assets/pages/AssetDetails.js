import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosConfig";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`/api/assets/${id}`);
        setAsset(response.data);
      } catch (err) {
        setError("Error fetching asset details");
        console.error(err);
      }
    };
    fetchAsset();
  }, [id]);

  if (error) {
    return <div className="container mt-4"><p className="text-danger">{error}</p></div>;
  }

  if (!asset) {
    return <div className="container mt-4"><p>Loading asset details...</p></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Asset Details</h2>
      <div className="card p-4 shadow-sm">
        <h4>{asset.assetName}</h4>
        <p><strong>Type:</strong> {asset.assetType}</p>
        <p><strong>Status:</strong> {asset.status}</p>
        <p><strong>Location:</strong> {asset.location}</p>
        <p><strong>Assigned To:</strong> {asset.assignedTo || "Not assigned"}</p>
        <p><strong>Purchase Date:</strong> {asset.purchaseDate || "N/A"}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/assets/list")}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
