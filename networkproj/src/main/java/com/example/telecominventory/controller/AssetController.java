package com.example.telecominventory.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.telecominventory.entity.Asset;
import com.example.telecominventory.entity.AssetStatus;
import com.example.telecominventory.entity.AssetType;
import com.example.telecominventory.service.AssetService;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {

    @Autowired
    private AssetService assetService;

    // -------------------------------
    // ✅ CRUD Endpoints
    // -------------------------------
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @GetMapping("/{id}")
    public Asset getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
    }

    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }

    @PutMapping("/{id}")
    public Asset updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        return assetService.updateAsset(id, asset);
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
    }

    // -------------------------------
    // 🔍 Filtering Endpoints
    // -------------------------------
    @GetMapping("/type/{type}")
    public List<Asset> getAssetsByType(@PathVariable AssetType type) {
        return assetService.getAssetsByType(type);
    }

    @GetMapping("/status/{status}")
    public List<Asset> getAssetsByStatus(@PathVariable AssetStatus status) {
        return assetService.getAssetsByStatus(status);
    }

    @GetMapping("/location/{location}")
    public List<Asset> getAssetsByLocation(@PathVariable String location) {
        return assetService.getAssetsByLocation(location);
    }

    // -------------------------------
    // 🔄 Assignment Endpoint
    // -------------------------------
    @PutMapping("/assign/{id}")
    public Asset assignAsset(
            @PathVariable Long id,
            @RequestParam Long customerId,
            @RequestParam(defaultValue = "system") String performedBy) {
        return assetService.assignAsset(id, customerId, performedBy);
    }
}
