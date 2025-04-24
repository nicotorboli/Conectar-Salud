package com.conectarsalud.backend.service;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.model.Medico;
import org.apache.coyote.Request;

public interface AuthService {

    public AuthResponse registrarMedico(Medico medico);
    public AuthResponse loginMedico(LoginRequestDTO request);

}
