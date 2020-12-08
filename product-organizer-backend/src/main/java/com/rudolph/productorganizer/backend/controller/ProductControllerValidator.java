package com.rudolph.productorganizer.backend.controller;

import com.rudolph.productorganizer.backend.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductControllerValidator {

    public boolean isValidUpdateProductRequest(Product product, long id) {
        return product.getId() == id;
    }
}
