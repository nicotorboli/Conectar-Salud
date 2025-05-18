package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.dtos.RegisterUsuarioDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Rol;
import com.conectarsalud.backend.model.Usuario;
import com.conectarsalud.backend.model.UsuarioCS;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.AuthService;
import com.conectarsalud.backend.service.JwtService;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.UsuarioCSService;
import com.conectarsalud.backend.service.exceptions.UsuarioNoEncontrado;
import com.conectarsalud.backend.service.exceptions.UsuarioYaExistenteException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.conectarsalud.backend.model.Rol.MEDICO;
import static com.conectarsalud.backend.model.Rol.USUARIO;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final MedicoService medicoService;
    private final UsuarioCSService usuarioCSService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService,
                           MedicoService medicoService, UsuarioCSService usuarioCSService,
                           AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.medicoService = medicoService;
        this.usuarioCSService = usuarioCSService;
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
        return new AuthResponse(jwtService.getToken(medico), medico.getMatriculaProfesional(), MEDICO);
    }

    @Override
    public AuthResponse login(LoginRequestDTO request) {
        // Buscar usuario sin discriminar por rol primero
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsuarioNoEncontrado("Credenciales inválidas"));

        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        // Determinar si es médico para incluir matrícula
        String matricula = null;
        if(usuario.getRol() == Rol.MEDICO) {
            Medico medico = medicoService.findByEmail(request.email());
            matricula = medico.getMatriculaProfesional();
        }

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .matricula(matricula)
                .rol(usuario.getRol())
                .build();
    }

    @Override
    public AuthResponse registrarUsuario(RegisterUsuarioDTO request, PasswordEncoder passwordEncoder) {
        usuarioRepository.findByEmail(request.email())
                .ifPresent(existingUsuario -> {
                    throw new UsuarioYaExistenteException();
                });

        UsuarioCS usuario = new UsuarioCS(
                request.email(),
                passwordEncoder.encode(request.contraseña())
        );

        usuarioRepository.save(usuario);
        return new AuthResponse(jwtService.getToken(usuario), null, USUARIO);
    }


}
