package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.dtos.RegisterMedicoDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public AuthController(PasswordEncoder passwordEncoder, AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/login")
    public  ResponseEntity<AuthResponse> logearMedico(@RequestBody @Valid LoginRequestDTO request) {
        return ResponseEntity.ok(authService.loginMedico(request));
    }

    @PostMapping("/register/medico")
    public ResponseEntity<AuthResponse> registerMedico(@RequestBody @Valid RegisterMedicoDTO registerMedicoDTO) {
        Medico medicoNuevo = registerMedicoDTO.aModelo(passwordEncoder);
        return ResponseEntity.ok(authService.registrarMedico(medicoNuevo));
    }



}
