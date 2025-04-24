package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Medico;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    public String getToken(UserDetails user);

    String getUsernameFromToken(String token);

    boolean isTokenValid(String token, UserDetails userDetails);
}
