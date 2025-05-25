package com.conectarsalud.backend.repository;


import com.conectarsalud.backend.model.Comentario;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByMedicoIdOrderByFechaDesc(Long medicoId);

    boolean existsByAutorIdAndMedicoId(Long autorId, Long medicoId);

    boolean existsByAutorAndMedico(Usuario autor, Medico medico);
}