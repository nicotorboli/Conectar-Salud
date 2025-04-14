package com.conectarsalud.backend.repository;

import com.conectarsalud.backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
}
