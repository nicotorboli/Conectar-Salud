package com.conectarsalud.backend.controller;

import com.conectarsalud.backend.dtos.MedicoDTO;
import com.conectarsalud.backend.model.Especialidades;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.exceptions.EmailNoValidoException;
import com.conectarsalud.backend.service.exceptions.EmailYaRegistradoException;
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
        Medico medicoAActualizar = medicoService.findByMatriculaProfesional(med.matriculaProfesional()).get();
        if (!medicoService.validarFormatoEmail(med.email())){
            throw new EmailNoValidoException("mail invalido");
        }
        if(!medicoService.verificarEmailDisponible(medicoAActualizar.getEmail(),med.email())){
            throw new EmailYaRegistradoException();
        }

        medicoService.actualizar(med.aModelo(medicoAActualizar.getPassword()));
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

    @GetMapping("/precio/{min}/{max}")
    public List<Medico> buscarMedicoPorPrecio(@PathVariable int min, @PathVariable int max ){
        if(min > max){
            throw  new RuntimeException("El valor minimo debe ser menor que el maximo");
        }
        return medicoService.medicosPrecioEntre(min,  max);
    }

    @GetMapping("/ubicacion/{ubicacion}")
    public  List<Medico> buscarMedicosPorUbicacion(@PathVariable String ubicacion){
        return  medicoService.medicosPorUbicacion(ubicacion);
    }

    @PostMapping("/{medicoId}/like")
    public ResponseEntity<?> toggleLike(
            @PathVariable Long medicoId,
            @RequestBody Map<String, Object> body
    ) {
        String mail = String.valueOf(body.get("usuarioEmail"));
        Long usuarioId = medicoService.idDeUsuarioPorMail(mail);
        boolean dioLike = medicoService.toggleLike(medicoId, usuarioId);
        String mensaje = dioLike ? "Like agregado" : "Like removido";
        return ResponseEntity.ok().body(Map.of("mensaje", mensaje));
    }

    @DeleteMapping("/matricula/{matricula}")
    public void deleteMedico (@PathVariable String matricula){
        medicoService.deleteByMatriculaProfesional(matricula);
    }
}
