package com.webproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shapes")
public class Shape {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String shapeId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShapeType type;
    
    @Column(nullable = false)
    private Double x;
    
    @Column(nullable = false)
    private Double y;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drawing_id", nullable = false)
    private Drawing drawing;
    
    public enum ShapeType {
        CIRCLE, SQUARE, TRIANGLE
    }
    
    // Constructors
    public Shape() {}
    
    public Shape(String shapeId, ShapeType type, Double x, Double y) {
        this.shapeId = shapeId;
        this.type = type;
        this.x = x;
        this.y = y;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getShapeId() {
        return shapeId;
    }
    
    public void setShapeId(String shapeId) {
        this.shapeId = shapeId;
    }
    
    public ShapeType getType() {
        return type;
    }
    
    public void setType(ShapeType type) {
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
    
    public Drawing getDrawing() {
        return drawing;
    }
    
    public void setDrawing(Drawing drawing) {
        this.drawing = drawing;
    }
} 