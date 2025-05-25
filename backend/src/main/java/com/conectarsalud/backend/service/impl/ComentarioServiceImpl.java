package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.dtos.ComentarioDTO;
import com.conectarsalud.backend.dtos.ComentarioResponse;
import com.conectarsalud.backend.model.*;
import com.conectarsalud.backend.repository.*;
import com.conectarsalud.backend.service.ComentarioService;
import com.conectarsalud.backend.service.exceptions.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ComentarioServiceImpl implements ComentarioService {
    private final ComentarioRepository comentarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final MedicoRepository medicoRepository;

    @Override

    public ComentarioResponse crearComentario(ComentarioDTO comentarioDTO, String usuarioEmail) {
        Usuario autor = usuarioRepository.findByEmail(usuarioEmail)
                .orElseThrow(() -> new UsuarioNoEncontrado("Usuario no encontrado"));

        Medico medico = medicoRepository.findById(comentarioDTO.medicoId())
                .orElseThrow(() ->  new UsuarioNoEncontrado("Usuario no encontrado"));

        if (medicoRepository.findByEmail(usuarioEmail).isPresent()) {
            throw new MedicoComentarException("Los Medicos no pueden comentar");
        }

        if(comentarioRepository.existsByAutorAndMedico(autor, medico)) {
            throw new ComentarioDuplicadoException("Solo podes comentar una vez a este médico");
        }



        Comentario comentario = new Comentario(
                comentarioDTO.contenido(),
                autor,
                medico
        );

        Comentario saved = comentarioRepository.save(comentario);

        return new ComentarioResponse(
                saved.getId(),
                saved.getContenido(),
                saved.getFecha(),
                saved.getAutor().getId()
        );
    }

    @Override
    public List<ComentarioResponse> obtenerComentariosPorMedico(Long medicoId) {
        return comentarioRepository.findByMedicoIdOrderByFechaDesc(medicoId).stream()
                .map(c -> new ComentarioResponse(
                        c.getId(),
                        c.getContenido(),
                        c.getFecha(),
                        c.getAutor().getId()))
                .collect(Collectors.toList());
    }

    @Override

    public void eliminarComentario(Long comentarioId, String usuarioEmail) {
        Comentario comentario = comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        if(!comentario.getAutor().getEmail().equals(usuarioEmail)) {
            throw new RuntimeException("No tenes permiso para eliminar este comentario");
        }

        comentarioRepository.delete(comentario);
    }
}