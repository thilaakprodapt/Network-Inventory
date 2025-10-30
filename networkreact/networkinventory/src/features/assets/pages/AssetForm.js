import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const AssetForm = () => {
  const [asset, setAsset] = useState({
    assetType: "",
    model: "",
    serialNumber: "",
    status: "Available",
    location: "",
    assignedToCustomerId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/assets/${id}`)
        .then((res) => setAsset(res.data))
        .catch(() => {
          setMessage("Failed to load asset details.");
          setMessageType("danger");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axiosInstance.put(`/assets/${id}`, asset)
      : axiosInstance.post("/assets", asset);

    apiCall
      .then(() => {
        setMessage(id ? "✅ Asset updated successfully!" : "✅ Asset added successfully!");
        setMessageType("success");
        // Wait 1.5s then go back to list
        setTimeout(() => navigate("/assets/list"), 1500);
      })
      .catch(() => {
        setMessage("❌ Failed to save asset. Please check the details.");
        setMessageType("danger");
      });
  };

  return (
    <div className="container mt-5 asset-form-card shadow-sm rounded bg-white p-4">
      <h3 className="fw-bold mb-4 text-primary">
        {id ? "Edit Asset" : "Add New Asset"}
      </h3>

      {message && (
        <div className={`alert alert-${messageType} fw-semibold`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Asset Type</label>
            <select
              className="form-select"
              name="assetType"
              value={asset.assetType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="ONT">ONT</option>
              <option value="Router">Router</option>
              <option value="Splitter">Splitter</option>
              <option value="FDH">FDH</option>
              <option value="Switch">Switch</option>
              <option value="CPE">CPE</option>
              <option value="FiberRoll">Fiber Roll</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Model</label>
            <input
              className="form-control"
              name="model"
              value={asset.model}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Serial Number</label>
            <input
              className="form-control"
              name="serialNumber"
              value={asset.serialNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={asset.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Faulty">Faulty</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              className="form-control"
              name="location"
              value={asset.location}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Assigned To (Customer ID)</label>
            <input
              className="form-control"
              name="assignedToCustomerId"
              value={asset.assignedToCustomerId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-success px-4" type="submit">
            {id ? "Update Asset" : "Add Asset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
