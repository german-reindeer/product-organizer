package com.rudolph.productorganizer.backend.repository;

import com.rudolph.productorganizer.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
