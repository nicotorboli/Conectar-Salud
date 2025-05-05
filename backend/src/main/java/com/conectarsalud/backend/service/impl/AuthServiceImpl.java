package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.AuthService;
import com.conectarsalud.backend.service.JwtService;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.exceptions.UsuarioNoEncontrado;
import com.conectarsalud.backend.service.exceptions.UsuarioYaExistenteException;
import org.apache.coyote.Request;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final MedicoService medicoService;
    private final AuthenticationManager authenticationManager;


    public AuthServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService, MedicoService medicoService, AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.medicoService = medicoService;
        this.authenticationManager = authenticationManager;
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
        return new AuthResponse(jwtService.getToken(medico), medico.getMatriculaProfesional());
    }

    @Override
    public AuthResponse loginMedico(LoginRequestDTO request) {

        usuarioRepository.findByEmail(request.email())
                .orElseThrow(()-> new UsuarioNoEncontrado("Este mail no se encuentra registrado"));

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails user = usuarioRepository.findByEmail(request.email()).orElseThrow();
        String token = jwtService.getToken(user);
        Medico med = medicoService.findByEmail(request.email());
        return AuthResponse.builder().token(token).matricula(med.getMatriculaProfesional()).build();
    }
}
