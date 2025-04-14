package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.AuthService;
import com.conectarsalud.backend.service.JwtService;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.exceptions.UsuarioYaExistenteException;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final MedicoService medicoService;

    public AuthServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService, MedicoService medicoService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.medicoService = medicoService;
    }

    @Override
    public AuthResponse registrarMedico(Medico medico) {

        usuarioRepository.findByEmail(medico.getEmail())
                .ifPresent(existingUsuario -> {
                    throw new UsuarioYaExistenteException();
                });

        medicoService.findByMatriculaProfesional(medico.getMatriculaProfesional())
                .ifPresent(existingUsuario -> {
                    throw new UsuarioYaExistenteException();
                });

        usuarioRepository.save(medico);
        return new AuthResponse(jwtService.getToken(medico));
    }

    @Override
    public AuthResponse loginMedico(Medico medico) {
        return null;
    }
}
