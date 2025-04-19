package com.conectarsalud.backend.repository;

import com.conectarsalud.backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Optional<Medico> findByMatriculaProfesional(String matriculaProfesional);

    List<Medico> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);
    List<Medico> findByEspecialidad(String nombre);
}
