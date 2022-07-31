package com.wipro.digirich.productservice.exception;


/*
 * ResourceNotFoundException will be executed 
 * if some resource does not exist.
 */
public class ResourceNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}

