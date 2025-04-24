package com.conectarsalud.backend.dtos;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record LoginRequestDTO(

        @Email
        String email,

        @NotEmpty(message = "Contraseña requerida")
        String password
        ) {

}
