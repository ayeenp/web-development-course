package com.webproject.controller;

import com.webproject.dto.DrawingDto;
import com.webproject.model.User;
import com.webproject.service.DrawingService;
import com.webproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/drawing")
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController {
    
    @Autowired
    private DrawingService drawingService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveDrawing(@RequestBody Map<String, Object> request) {
        try {
            String username = (String) request.get("username");
            DrawingDto drawingDto = new DrawingDto();
            
            // Extract drawing data from request
            drawingDto.setTitle((String) request.get("title"));
            
            @SuppressWarnings("unchecked")
            var shapesData = (java.util.List<Map<String, Object>>) request.get("shapes");
            
            if (shapesData != null) {
                var shapes = shapesData.stream()
                        .map(shapeData -> {
                            var shapeDto = new com.webproject.dto.ShapeDto();
                            shapeDto.setId((String) shapeData.get("id"));
                            shapeDto.setType((String) shapeData.get("type"));
                            shapeDto.setX(((Number) shapeData.get("x")).doubleValue());
                            shapeDto.setY(((Number) shapeData.get("y")).doubleValue());
                            return shapeDto;
                        })
                        .toList();
                drawingDto.setShapes(shapes);
            }
            
            User user = userService.findByUsername(username);
            DrawingDto savedDrawing = drawingService.saveDrawing(user, drawingDto);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Drawing saved successfully",
                    "drawing", savedDrawing
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/load/{username}")
    public ResponseEntity<?> loadAllDrawings(@PathVariable String username) {
        try {
            User user = userService.findByUsername(username);
            List<DrawingDto> drawings = drawingService.loadAllDrawings(user);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Drawings loaded successfully",
                    "drawings", drawings
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/load/{username}/{drawingId}")
    public ResponseEntity<?> loadDrawing(@PathVariable String username, @PathVariable Long drawingId) {
        try {
            User user = userService.findByUsername(username);
            DrawingDto drawing = drawingService.loadDrawing(user, drawingId);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Drawing loaded successfully",
                    "drawing", drawing
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 