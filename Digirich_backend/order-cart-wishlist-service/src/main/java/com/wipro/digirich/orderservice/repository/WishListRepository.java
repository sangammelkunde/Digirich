package com.wipro.digirich.orderservice.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.digirich.orderservice.model.User;
import com.wipro.digirich.orderservice.model.WishList;


/*
 * Wishlist Repository to interact with the database 
 * and to perform CRUD operations on Wishlist.
 */
@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {
    List<WishList> getWishListByUser(User user);
    List<WishList> findAllByUserOrderByCreatedDateDesc(User user);
}