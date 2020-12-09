package com.rudolph.productorganizer.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ProductControllerAdvice {
    @ExceptionHandler(value = ProductValidationException.class)
    public ResponseEntity<Object> exception(ProductValidationException exception) {
        return new ResponseEntity<>("Invalid product request", HttpStatus.BAD_REQUEST);
    }
}
