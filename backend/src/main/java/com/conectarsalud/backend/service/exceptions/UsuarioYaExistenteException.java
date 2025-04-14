package com.conectarsalud.backend.service.exceptions;

public class UsuarioYaExistenteException extends RuntimeException {
    public UsuarioYaExistenteException() {
        super("El usuario ya se encuentra registrado");
    }
}
