package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.Rol;
import lombok.Builder;

@Builder
public record AuthResponse(
        String token,
        String matricula,
        Rol rol,
        String email
) {
}
