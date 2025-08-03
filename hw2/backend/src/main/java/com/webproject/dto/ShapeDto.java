package com.webproject.dto;

public class ShapeDto {
    private String id;
    private String type;
    private Double x;
    private Double y;
    
    // Constructors
    public ShapeDto() {}
    
    public ShapeDto(String id, String type, Double x, Double y) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Double getX() {
        return x;
    }
    
    public void setX(Double x) {
        this.x = x;
    }
    
    public Double getY() {
        return y;
    }
    
    public void setY(Double y) {
        this.y = y;
    }
} 