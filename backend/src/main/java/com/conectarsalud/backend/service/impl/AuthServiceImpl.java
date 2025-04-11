package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.AuthService;
import com.conectarsalud.backend.service.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public AuthServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse registrarMedico(Medico medico) {
        //VALIDAR MATRICULA
        usuarioRepository.save(medico);
        return new AuthResponse(jwtService.getToken(medico));
    }

    @Override
    public AuthResponse loginMedico(Medico medico) {
        return null;
    }
}
