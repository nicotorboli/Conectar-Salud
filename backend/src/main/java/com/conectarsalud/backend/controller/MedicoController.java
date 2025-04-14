package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.MedicoDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.MedicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping
    public List<MedicoDTO> obtenerTodos() {
        return medicoService.obtenerTodosLosMedicos().stream()
                .map(MedicoDTO::desdeModelo)
                .toList();

    }
}
