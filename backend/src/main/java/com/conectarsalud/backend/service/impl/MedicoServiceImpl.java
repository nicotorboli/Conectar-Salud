package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.MedicoRepository;
import com.conectarsalud.backend.service.MedicoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll();
    }
}
