package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Usuario;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.UsuarioCSService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioCSServiceImpl implements UsuarioCSService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioCSServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email).get();

    }
    public boolean validarFormatoEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email.matches(regex);
    }
}
