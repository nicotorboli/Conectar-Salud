package com.conectarsalud.backend.service;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.model.Medico;

public interface AuthService {

    public AuthResponse registrarMedico(Medico medico);
    public AuthResponse loginMedico(Medico medico);

}
