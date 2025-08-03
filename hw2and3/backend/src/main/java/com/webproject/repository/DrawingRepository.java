package com.webproject.repository;

import com.webproject.model.Drawing;
import com.webproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    List<Drawing> findByUser(User user);
    Optional<Drawing> findByUserAndId(User user, Long id);
} 