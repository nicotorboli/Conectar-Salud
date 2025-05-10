package com.conectarsalud.backend.service.exceptions;

public class EmailYaRegistradoException extends RuntimeException {
    public EmailYaRegistradoException() {
        super("El usuario ya se encuentra registrado");}
}
