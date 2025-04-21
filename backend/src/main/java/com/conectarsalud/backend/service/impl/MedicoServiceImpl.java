package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.MedicoRepository;
import com.conectarsalud.backend.service.MedicoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll();
    }

    @Override
    public Optional<Medico> findByMatriculaProfesional(String matriculaProfesional) {
        return medicoRepository.findByMatriculaProfesional(matriculaProfesional);
    }

    public List<Medico> obtenerTodosLosMedicosPorNombre(String nombre){
        return medicoRepository.buscarPorNombreCompleto( nombre);
    }
    // averiguar tanto por nombre o apellido
    public List<Medico> obtenerTodosPorEspecialidad(String especialidad){
        return  medicoRepository.findByEspecialidadContainingIgnoreCase(especialidad);
    }

}
