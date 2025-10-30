package com.example.telecominventory.repository;

import com.example.telecominventory.entity.Asset;
import com.example.telecominventory.entity.AssetStatus;
import com.example.telecominventory.entity.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    // Filtering methods
    List<Asset> findByAssetType(AssetType assetType);
    List<Asset> findByStatus(AssetStatus status);
    List<Asset> findByLocation(String location);
}
