package com.conectarsalud.backend.dtos;

import jakarta.validation.constraints.*;

public record ComentarioDTO(
        @NotBlank(message = "El contenido no puede estar vacío")
        @Size(max = 250, message = "El comentario no puede superar los 250 caracteres")
        String contenido,


        @NotNull(message = "El ID del médico es requerido")
        Long medicoId
) {}