package com.wipro.digirich.productservice.dto;

/*
 *	ResponseDTO to transfer data in the required 
 *	format to the client side 
 *
 */
public class ResponseDTO {
	private String status;
	private String message;

	public ResponseDTO() {
		super();
	}

	public ResponseDTO(String status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
