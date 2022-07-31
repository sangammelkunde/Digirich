package com.wipro.digirich.orderservice.repository;


import com.wipro.digirich.orderservice.model.Cart;
import com.wipro.digirich.orderservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
 * Cart Repository to interact with the database 
 * and to perform CRUD operations on Cart.
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	List<Cart> getCartByUser(User user);
    List<Cart> findAllByUserOrderByCreatedDateDesc(User user);
    void deleteByUser(User user);
}
