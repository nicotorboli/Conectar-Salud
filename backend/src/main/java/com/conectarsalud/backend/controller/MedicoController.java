package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.MedicoDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.MedicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/matricula/{matricula}")
    public MedicoDTO medicoDeMatricula(@PathVariable String matricula){
        return  MedicoDTO.desdeModelo(medicoService.findByMatriculaProfesional(matricula).get());
    }

    @GetMapping("/nombre/{nombre}")
    public List<MedicoDTO> medicosPorNombre(@PathVariable String nombre){
        return medicoService.obtenerTodosLosMedicosPorNombre(nombre).stream()
                .map(MedicoDTO::desdeModelo)
                .toList();
    }

    @GetMapping("/especialidad/{especialidad}")
    public  List<MedicoDTO> medicosProEspecialidad(@PathVariable String especialidad){
        return medicoService.obtenerTodosPorEspecialidad(especialidad).stream()
                .map(MedicoDTO::desdeModelo)
                .toList();
    }
}
