package com.conectarsalud.backend.dtos;

import lombok.Builder;

@Builder
public record AuthResponse(
        String token
) {
}
