package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.LoginRequestDTO;
import com.conectarsalud.backend.dtos.RegisterMedicoDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @PostMapping(value = "/register/medico", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuthResponse> registerMedico(
            @RequestPart(value = "medico", required = true) String medicoStr,
            @RequestPart(value = "foto", required = false) MultipartFile foto) throws IOException {

        // Convertir el string JSON a DTO manualmente
        ObjectMapper objectMapper = new ObjectMapper();
        RegisterMedicoDTO registerMedicoDTO = objectMapper.readValue(medicoStr, RegisterMedicoDTO.class);

        Medico medicoNuevo = registerMedicoDTO.aModelo(passwordEncoder, foto);
        return ResponseEntity.ok(authService.registrarMedico(medicoNuevo));
    }



}
