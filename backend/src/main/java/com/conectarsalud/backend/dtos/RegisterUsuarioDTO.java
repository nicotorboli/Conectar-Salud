package com.conectarsalud.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record RegisterUsuarioDTO (
    @NotEmpty String nombre,
    @NotEmpty String apellido,
    @Email String email,
    @NotEmpty String contraseña

){}
