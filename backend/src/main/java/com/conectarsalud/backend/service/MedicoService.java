package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Medico;

import java.util.List;
import java.util.Optional;

public interface MedicoService {

    public List<Medico> obtenerTodosLosMedicos();

    Optional<Medico> findByMatriculaProfesional(String matriculaProfesional);
}
