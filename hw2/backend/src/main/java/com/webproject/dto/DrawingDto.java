package com.webproject.dto;

import java.util.List;

public class DrawingDto {
    private String title;
    private List<ShapeDto> shapes;
    
    // Constructors
    public DrawingDto() {}
    
    public DrawingDto(String title, List<ShapeDto> shapes) {
        this.title = title;
        this.shapes = shapes;
    }
    
    // Getters and Setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public List<ShapeDto> getShapes() {
        return shapes;
    }
    
    public void setShapes(List<ShapeDto> shapes) {
        this.shapes = shapes;
    }
} 