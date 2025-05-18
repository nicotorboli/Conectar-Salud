package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Usuario;

public interface UsuarioCSService {
    Usuario findByEmail(String email);
}
