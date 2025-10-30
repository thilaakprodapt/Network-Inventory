import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosConfig';
import { Link } from 'react-router-dom';
import '../../../styles/main.css';


const AssetList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    axiosInstance.get('/assets')
      .then(res => setAssets(res.data))
      .catch(err => console.error(err));
  };

  const deleteAsset = (id) => {
    if (window.confirm('Delete this asset?')) {
      axiosInstance.delete(`/assets/${id}`)
        .then(() => fetchAssets());
    }
  };

  return (
    <div className="asset-container">
      <div className="asset-header">
        <div>
          <h2 className="asset-title">📦 Asset Inventory</h2>
          <p className="asset-subtitle">Manage, track, and monitor your organization's assets efficiently.</p>
        </div>
        <Link className="btn btn-gradient" to="/assets/new">➕ Add New Asset</Link>
      </div>

      <div className="asset-table-wrapper">
        <table className="table table-hover align-middle shadow-sm rounded asset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Location</th>
              <th>Assigned To</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((a) => (
                <tr key={a.assetId}>
                  <td>{a.assetId}</td>
                  <td>{a.assetType}</td>
                  <td>{a.model}</td>
                  <td>{a.serialNumber}</td>
                  <td>
                    <span className={`status-badge ${a.status?.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>{a.location}</td>
                  <td>{a.assignedToCustomerId || '-'}</td>
                  <td className="text-center">
                    <Link to={`/assets/edit/${a.assetId}`} className="btn btn-sm btn-outline-warning me-2">✏️</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAsset(a.assetId)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-4">
                  No assets found. Add your first asset to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
