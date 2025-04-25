package com.conectarsalud.backend.service.exceptions;

public class UsuarioNoEncontrado extends RuntimeException {
    public UsuarioNoEncontrado(String message) {
        super(message);
    }
}
