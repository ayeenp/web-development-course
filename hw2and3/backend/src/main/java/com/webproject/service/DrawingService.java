package com.webproject.service;

import com.webproject.dto.DrawingDto;
import com.webproject.dto.ShapeDto;
import com.webproject.model.Drawing;
import com.webproject.model.Shape;
import com.webproject.model.User;
import com.webproject.repository.DrawingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DrawingService {
    
    @Autowired
    private DrawingRepository drawingRepository;
    
    public DrawingDto saveDrawing(User user, DrawingDto drawingDto) {
        Drawing drawing = new Drawing();
        drawing.setUser(user);
        drawing.setTitle(drawingDto.getTitle());
        
        // Add shapes
        if (drawingDto.getShapes() != null) {
            for (ShapeDto shapeDto : drawingDto.getShapes()) {
                Shape shape = new Shape();
                shape.setShapeId(shapeDto.getId());
                shape.setType(Shape.ShapeType.valueOf(shapeDto.getType().toUpperCase()));
                shape.setX(shapeDto.getX());
                shape.setY(shapeDto.getY());
                drawing.addShape(shape);
            }
        }
        
        Drawing savedDrawing = drawingRepository.save(drawing);
        return convertToDto(savedDrawing);
    }
    
    public List<DrawingDto> loadAllDrawings(User user) {
        List<Drawing> drawings = drawingRepository.findByUser(user);
        return drawings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public DrawingDto loadDrawing(User user, Long drawingId) {
        Drawing drawing = drawingRepository.findByUserAndId(user, drawingId)
                .orElse(new Drawing("New Drawing"));
        
        return convertToDto(drawing);
    }
    
    private DrawingDto convertToDto(Drawing drawing) {
        List<ShapeDto> shapeDtos = drawing.getShapes().stream()
                .map(shape -> new ShapeDto(
                        shape.getShapeId(),
                        shape.getType().name().toLowerCase(),
                        shape.getX(),
                        shape.getY()
                ))
                .collect(Collectors.toList());
        
        return new DrawingDto(drawing.getTitle(), shapeDtos);
    }
} 