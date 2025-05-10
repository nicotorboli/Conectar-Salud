package com.conectarsalud.backend.service.exceptions;

public class EmailNoValidoException extends RuntimeException {
    public EmailNoValidoException(String message) {
        super(message);
    }
}
