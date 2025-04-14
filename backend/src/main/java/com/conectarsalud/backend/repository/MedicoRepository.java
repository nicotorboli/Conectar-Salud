package com.conectarsalud.backend.repository;

import com.conectarsalud.backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Optional<Medico> findByMatriculaProfesional(String matriculaProfesional);
}
