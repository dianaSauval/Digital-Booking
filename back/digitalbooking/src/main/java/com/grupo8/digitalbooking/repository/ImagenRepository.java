package com.grupo8.digitalbooking.repository;

import com.grupo8.digitalbooking.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagenRepository extends JpaRepository<Imagen, Integer> {
    List<Imagen> findByProductoId(Integer productId);
}
