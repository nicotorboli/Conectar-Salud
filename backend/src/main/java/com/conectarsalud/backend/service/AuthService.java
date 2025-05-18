package com.conectarsalud.backend.service;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.dtos.RegisterUsuarioDTO;
import com.conectarsalud.backend.model.Medico;
import org.apache.coyote.Request;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface AuthService {

    public AuthResponse registrarMedico(Medico medico);

    AuthResponse login(LoginRequestDTO request);

    AuthResponse registrarUsuario(RegisterUsuarioDTO request, PasswordEncoder passwordEncoder);


}
