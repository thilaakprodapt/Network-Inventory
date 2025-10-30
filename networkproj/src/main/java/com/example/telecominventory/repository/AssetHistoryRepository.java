package com.example.telecominventory.repository;

import com.example.telecominventory.entity.AssetHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetHistoryRepository extends JpaRepository<AssetHistory, Long> {

    // Get all history records for a specific asset
    List<AssetHistory> findByAssetId(Long assetId);
}
