package com.conectarsalud.backend.dtos;

import jakarta.validation.constraints.*;

public record ComentarioDTO(
        @NotBlank(message = "El contenido no puede estar vacío")
        String contenido,


        @NotNull(message = "El ID del médico es requerido")
        Long medicoId
) {}