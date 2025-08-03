package com.webproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drawings")
public class Drawing {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "drawing", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Shape> shapes = new ArrayList<>();
    
    // Constructors
    public Drawing() {}
    
    public Drawing(String title) {
        this.title = title;
    }
    
    // Helper methods
    public void addShape(Shape shape) {
        shapes.add(shape);
        shape.setDrawing(this);
    }
    
    public void removeShape(Shape shape) {
        shapes.remove(shape);
        shape.setDrawing(null);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public List<Shape> getShapes() {
        return shapes;
    }
    
    public void setShapes(List<Shape> shapes) {
        this.shapes = shapes;
    }
} 