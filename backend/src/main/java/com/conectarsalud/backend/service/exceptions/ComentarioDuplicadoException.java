package com.conectarsalud.backend.service.exceptions;

public class ComentarioDuplicadoException extends RuntimeException {
    public ComentarioDuplicadoException(String message) {
        super(message);
    }
}
