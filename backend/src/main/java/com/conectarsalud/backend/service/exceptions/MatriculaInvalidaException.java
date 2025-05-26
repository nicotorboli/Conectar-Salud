package com.conectarsalud.backend.service.exceptions;

public class MatriculaInvalidaException extends RuntimeException {
    public MatriculaInvalidaException(String message) {
        super(message);
    }
}
