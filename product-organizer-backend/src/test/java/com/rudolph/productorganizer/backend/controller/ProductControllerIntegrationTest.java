package com.rudolph.productorganizer.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rudolph.productorganizer.backend.model.Product;
import com.rudolph.productorganizer.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
class ProductControllerIntegrationTest {

    private static final String PRODUCTS_PATH = "/products";

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ProductControllerValidator validator;

    @MockBean
    private ProductRepository repository;

    @Test
    void getProducts_shouldReturnProducts() throws Exception {
        // given
        List<Product> products = Collections.singletonList(createProduct());
        given(repository.findAll()).willReturn(products);

        // when / then
        mvc.perform(get(PRODUCTS_PATH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]").value(products.get(0)));
    }

    @Test
    void createProduct_shouldReturnSavedProduct() throws Exception {
        // given
        Product product = createProduct();
        given(repository.save(product)).willReturn(product);

        // when / then
        mvc.perform(post(PRODUCTS_PATH)
                .contentType(MediaType.APPLICATION_JSON).content(getObjectAsJson(product)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").value(product));
    }

    @Test
    void updateProduct_shouldReturnSavedProduct() throws Exception {
        // given
        Product product = createProduct();
        given(repository.save(product)).willReturn(product);
        given(validator.isValidUpdateProductRequest(product, product.getId())).willReturn(true);

        // when / then
        mvc.perform(put(PRODUCTS_PATH + "/" + product.getId())
                .contentType(MediaType.APPLICATION_JSON).content(getObjectAsJson(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(product));
    }

    @Test
    void updateProduct_shouldReturnBadRequest_forValidationError() throws Exception {
        // given
        Product product = createProduct();
        given(validator.isValidUpdateProductRequest(product, product.getId())).willReturn(false);

        // when / then
        mvc.perform(put(PRODUCTS_PATH + "/" + product.getId())
                .contentType(MediaType.APPLICATION_JSON).content(getObjectAsJson(product)))
                .andExpect(status().isBadRequest());
    }

    private Product createProduct() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Incredo Sandy");
        product.setTitle("Selfcleaning sandwichmaker");
        product.setDescription("The first sandwichmaker that cleans itself");
        return product;
    }

    private String getObjectAsJson(Object object) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(object);
    }

}
