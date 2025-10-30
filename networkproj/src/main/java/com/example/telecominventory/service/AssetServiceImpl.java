package com.example.telecominventory.service;

import com.example.telecominventory.entity.Asset;
import com.example.telecominventory.entity.AssetHistory;
import com.example.telecominventory.entity.AssetStatus;
import com.example.telecominventory.entity.AssetType;
import com.example.telecominventory.repository.AssetRepository;
import com.example.telecominventory.repository.AssetHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssetHistoryRepository assetHistoryRepository;

    // =========================================================
    // 🔹 BASIC CRUD OPERATIONS
    // =========================================================

    @Override
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    @Override
    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    @Override
    public Asset createAsset(Asset asset) {
        Asset savedAsset = assetRepository.save(asset);
        recordHistory(savedAsset.getAssetId(), "CREATED", "system");
        return savedAsset;
    }

    @Override
    public Asset updateAsset(Long id, Asset updatedAsset) {
        Optional<Asset> optionalAsset = assetRepository.findById(id);
        if (optionalAsset.isPresent()) {
            Asset existingAsset = optionalAsset.get();
            existingAsset.setAssetType(updatedAsset.getAssetType());
            existingAsset.setModel(updatedAsset.getModel());
            existingAsset.setSerialNumber(updatedAsset.getSerialNumber());
            existingAsset.setStatus(updatedAsset.getStatus());
            existingAsset.setLocation(updatedAsset.getLocation());
            existingAsset.setAssignedToCustomerId(updatedAsset.getAssignedToCustomerId());
            existingAsset.setAssignedDate(updatedAsset.getAssignedDate());

            Asset saved = assetRepository.save(existingAsset);
            recordHistory(id, "UPDATED", "system");
            return saved;
        } else {
            throw new RuntimeException("Asset not found with ID: " + id);
        }
    }

    @Override
    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
        recordHistory(id, "DELETED", "system");
    }

    // =========================================================
    // 🔹 FETCH / FILTER OPERATIONS
    // =========================================================

    @Override
    public List<Asset> getAssetsByType(AssetType type) {
        return assetRepository.findByAssetType(type);
    }

    @Override
    public List<Asset> getAssetsByStatus(AssetStatus status) {
        return assetRepository.findByStatus(status);
    }

    @Override
    public List<Asset> getAssetsByLocation(String location) {
        return assetRepository.findByLocation(location);
    }

    // =========================================================
    // 🔹 ASSIGNMENT OPERATION
    // =========================================================

    @Override
    public Asset assignAsset(Long id, Long customerId, String performedBy) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

        asset.setAssignedToCustomerId(customerId);
        asset.setStatus(AssetStatus.Assigned);
        asset.setAssignedDate(LocalDateTime.now());
        assetRepository.save(asset);

        recordHistory(id, "ASSIGNED to CustomerID " + customerId, performedBy);
        return asset;
    }

    // =========================================================
    // 🔹 HISTORY TRACKING HELPER
    // =========================================================

    private void recordHistory(Long assetId, String action, String performedBy) {
        AssetHistory history = new AssetHistory();
        history.setAssetId(assetId);
        history.setAction(action);
        history.setPerformedBy(performedBy);
        history.setTimestamp(LocalDateTime.now());
        assetHistoryRepository.save(history);
    }
}
