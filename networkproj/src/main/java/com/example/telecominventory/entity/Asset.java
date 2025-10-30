package com.example.telecominventory.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType assetType;

    @Column(length = 100)
    private String model;

    @Column(unique = true, length = 100)
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    private String location;

    private Long assignedToCustomerId;

    private LocalDateTime assignedDate;

    // Getters and Setters
    public Long getAssetId() { return assetId; }
    public void setAssetId(Long assetId) { this.assetId = assetId; }

    public AssetType getAssetType() { return assetType; }
    public void setAssetType(AssetType assetType) { this.assetType = assetType; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public AssetStatus getStatus() { return status; }
    public void setStatus(AssetStatus status) { this.status = status; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getAssignedToCustomerId() { return assignedToCustomerId; }
    public void setAssignedToCustomerId(Long assignedToCustomerId) { this.assignedToCustomerId = assignedToCustomerId; }

    public LocalDateTime getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDateTime assignedDate) { this.assignedDate = assignedDate; }
}
