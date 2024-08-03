package com.project.practice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String cent;
    private String estimatedAmount;
    private String engineerName;
    private String architect;
    private String mobileNumber;

    @Lob
    @Column(name = "sampleImage", columnDefinition = "LONGTEXT")
    private String sampleImage; // Base64 encoded image string

    @Lob
    @Column(name = "blueprint", columnDefinition = "LONGTEXT")
    private String blueprint; // Base64 encoded image string

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getCent() { return cent; }
    public void setCent(String cent) { this.cent = cent; }
    public String getEstimatedAmount() { return estimatedAmount; }
    public void setEstimatedAmount(String estimatedAmount) { this.estimatedAmount = estimatedAmount; }
    public String getEngineerName() { return engineerName; }
    public void setEngineerName(String engineerName) { this.engineerName = engineerName; }
    public String getArchitect() { return architect; }
    public void setArchitect(String architect) { this.architect = architect; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public String getSampleImage() { return sampleImage; }
    public void setSampleImage(String sampleImage) { this.sampleImage = sampleImage; }
    public String getBlueprint() { return blueprint; }
    public void setBlueprint(String blueprint) { this.blueprint = blueprint; }
}
