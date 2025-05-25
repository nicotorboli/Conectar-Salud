package com.conectarsalud.backend.service;

import com.conectarsalud.backend.dtos.ComentarioDTO;
import com.conectarsalud.backend.dtos.ComentarioResponse;
import com.conectarsalud.backend.model.Comentario;
import java.util.List;

public interface ComentarioService {
    ComentarioResponse crearComentario(ComentarioDTO comentarioDTO, String usuarioEmail);
    List<ComentarioResponse> obtenerComentariosPorMedico(Long medicoId);
    void eliminarComentario(Long comentarioId, String usuarioEmail);

}