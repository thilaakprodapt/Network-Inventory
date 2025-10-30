package com.example.telecominventory.service;

import com.example.telecominventory.entity.Asset;
import com.example.telecominventory.entity.AssetStatus;
import com.example.telecominventory.entity.AssetType;

import java.util.List;
import java.util.Optional;

public interface AssetService {

    // ==========================
    // 🔹 BASIC CRUD OPERATIONS
    // ==========================
    List<Asset> getAllAssets();
    Optional<Asset> getAssetById(Long id);
    Asset createAsset(Asset asset);
    Asset updateAsset(Long id, Asset asset);
    void deleteAsset(Long id);

    // ==========================
    // 🔹 FETCH / FILTER OPERATIONS
    // ==========================
    List<Asset> getAssetsByType(AssetType type);
    List<Asset> getAssetsByStatus(AssetStatus status);
    List<Asset> getAssetsByLocation(String location);

    // ==========================
    // 🔹 ASSIGNMENT OPERATION
    // ==========================
    Asset assignAsset(Long id, Long customerId, String performedBy);
}
