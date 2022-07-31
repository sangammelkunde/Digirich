package com.wipro.digirich.productservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/*
 * Exception Controller Advice to send the exception message as a 
 * response entity to the client side.
 */
@ControllerAdvice
public class ExceptionControllerAdvice extends IllegalArgumentException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ExceptionHandler(value = ResourceNotFoundException.class)
	public final ResponseEntity<String> handleResouceNotFoundException(
			ResourceNotFoundException resourceNotFoundException) {
		return new ResponseEntity<>(resourceNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
	}
}
