package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.UsuarioCS;

public record UsuarioDTO(
        Long id,
        String nombre,
        String apellido,
        String email
) {
    public static UsuarioDTO desdeModelo(UsuarioCS usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail());
    }
}
