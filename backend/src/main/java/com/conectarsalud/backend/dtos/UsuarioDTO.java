package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.UsuarioCS;

public record UsuarioDTO(
        Long id,
        String email
) {
    public static UsuarioDTO desdeModelo(UsuarioCS usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getEmail());
    }
}
