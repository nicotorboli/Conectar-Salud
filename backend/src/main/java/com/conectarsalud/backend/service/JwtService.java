package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Medico;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    public String getToken(UserDetails user);
}
