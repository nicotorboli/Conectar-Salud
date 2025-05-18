package com.conectarsalud.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record RegisterUsuarioDTO (

    @Email String email,
    @NotEmpty String password

){}
