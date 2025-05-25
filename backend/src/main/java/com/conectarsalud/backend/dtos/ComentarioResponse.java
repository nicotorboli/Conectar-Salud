package com.conectarsalud.backend.dtos;

import java.time.LocalDateTime;

public record ComentarioResponse(
        Long id,
        String contenido,
        LocalDateTime fecha,
        Long autorId
) {}
