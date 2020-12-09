package com.rudolph.productorganizer.backend.controller;

import com.rudolph.productorganizer.backend.model.Product;
import com.rudolph.productorganizer.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping("products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository repository;
    private final ProductControllerValidator validator;

    @GetMapping
    public List<Product> getProducts() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@Valid @RequestBody Product product) {
        return repository.save(product);
    }

    @PutMapping(value = "/{id}")
    public Product updateProduct(@Valid @RequestBody Product product, @PathVariable long id) {
        validator.validateUpdateProductRequest(product, id);
        return repository.save(product);
    }


}
