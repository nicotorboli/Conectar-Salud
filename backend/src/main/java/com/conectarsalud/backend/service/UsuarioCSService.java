package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Usuario;
import jakarta.validation.constraints.Email;

public interface UsuarioCSService {
    Usuario findByEmail(String email);

    boolean validarFormatoEmail(@Email String email);
}
