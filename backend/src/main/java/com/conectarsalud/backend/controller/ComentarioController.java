package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.ComentarioDTO;
import com.conectarsalud.backend.dtos.ComentarioResponse;
import com.conectarsalud.backend.model.Comentario;
import com.conectarsalud.backend.service.ComentarioService;
import com.conectarsalud.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/comentarios")
@RequiredArgsConstructor
public class ComentarioController {
    private final ComentarioService comentarioService;
    private final JwtService jwtService;


    @PostMapping
    public ResponseEntity<ComentarioResponse> crearComentario(
            @RequestBody ComentarioDTO comentarioDTO,
            @RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        String email = jwtService.getUsernameFromToken(token);
        return ResponseEntity.ok(comentarioService.crearComentario(comentarioDTO, email));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") ){
            throw new IllegalArgumentException("Token invalido");
        }
        return  authHeader.substring(7);
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<ComentarioResponse>> obtenerComentariosPorMedico(
            @PathVariable Long medicoId) {
        return ResponseEntity.ok(comentarioService.obtenerComentariosPorMedico(medicoId));
    }

    @DeleteMapping("/{comentarioId}")
    public ResponseEntity<Void> eliminarComentario(
            @PathVariable Long comentarioId,
            @RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        String email = jwtService.getUsernameFromToken(token);
        comentarioService.eliminarComentario(comentarioId, email);
        return ResponseEntity.noContent().build();
    }
}