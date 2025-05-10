package com.conectarsalud.backend.service;

import com.conectarsalud.backend.model.Medico;

import java.util.List;
import java.util.Optional;

public interface MedicoService {

    public List<Medico> obtenerTodosLosMedicos();

    Optional<Medico> findByMatriculaProfesional(String matriculaProfesional);

    void deleteByMatriculaProfesional(String matriculaProfesional);

    List<Medico> obtenerTodosLosMedicosPorNombre(String nombre);
    List<Medico> obtenerTodosPorEspecialidad(String especialidad);
    void actualizar(Medico med);
    Medico findByEmail(String email);

    boolean validarFormatoEmail(String email);

    boolean verificarEmailDisponible(String emailViejo, String emailAActualizar);
    List<Medico> medicosPrecioEntre(int min , int max);
}
