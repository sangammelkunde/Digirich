package com.wipro.digirich.orderservice.dto.wishlist;


import java.util.Date;

import com.wipro.digirich.orderservice.dto.ProductDTO;

/*
 *	WishListItemDTO to transfer data in the required 
 *	format to the client side 
 *
 */
public class WishListItemDTO {
	private Long id;
	private ProductDTO productDTO;
	private Date createdDate;

	public WishListItemDTO(Long id, ProductDTO productDTO) {
		this.id = id;
		this.productDTO = productDTO;
		this.createdDate = new Date();
	}

	public WishListItemDTO() {
		super();
	}

	public WishListItemDTO(Long id, ProductDTO productDTO, Date createdDate) {
		super();
		this.id = id;
		this.productDTO = productDTO;
		this.createdDate = createdDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProductDTO getProductDTO() {
		return productDTO;
	}

	public void setProductDTO(ProductDTO productDTO) {
		this.productDTO = productDTO;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	
}
