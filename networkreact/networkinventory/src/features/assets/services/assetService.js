import api from "../../../api/axiosConfig";

export const getAllAssets = () => api.get("/assets");

export const getAssetById = (id) => api.get(`/assets/${id}`);

export const createAsset = (asset) => api.post("/assets", asset);

export const updateAsset = (id, asset) => api.put(`/assets/${id}`, asset);

export const deleteAsset = (id) => api.delete(`/assets/${id}`);
