package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.MedicoDTO;
import com.conectarsalud.backend.model.Especialidades;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
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

    @PutMapping
    public void actualizarMedico(@RequestBody MedicoDTO med){
        String contra = medicoService.findByMatriculaProfesional(med.matriculaProfesional()).get().getPassword();
        medicoService.actualizar(med.aModelo(contra));
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

    @GetMapping("/especialidades")
    public  List<Map<String, String>> todasEspecialidades(){
         List<Map<String, String>> especialidades = Arrays.stream(Especialidades.values())
                .map(esp -> {
                    Map<String, String> espMap = new HashMap<>();
                    espMap.put("valor", esp.name()); // Ej: "CARDIOLOGIA"
                    espMap.put("display", esp.getNombreDisplay()); // Ej: "Cardiología"
                    return espMap;
                })
                .collect(Collectors.toList());
         return especialidades;
    }

    @GetMapping("/verificar-email")
    public ResponseEntity<?> verificarEmail(
            @RequestParam String email,
            @RequestParam String matricula) {


        if (!medicoService.validarFormatoEmail(email)) {
            return ResponseEntity.badRequest().body("Formato de email inválido");
        }

        boolean emailDisponible = medicoService.verificarEmailDisponible(email);

        return ResponseEntity.ok().body(emailDisponible);
    }

    @DeleteMapping("/matricula/{matricula}")
    public void deleteMedico (@PathVariable String matricula){
        medicoService.deleteByMatriculaProfesional(matricula);
    }
}
