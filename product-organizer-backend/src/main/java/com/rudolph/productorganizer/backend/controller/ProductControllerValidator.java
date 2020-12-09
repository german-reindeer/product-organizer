package com.rudolph.productorganizer.backend.controller;

import com.rudolph.productorganizer.backend.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductControllerValidator {

    public void validateUpdateProductRequest(Product product, long id) {
        if (product.getId() != id) {
            throw new ProductValidationException();
        }
    }
}
